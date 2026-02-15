const Slot = require("../../models/Slot");

exports.getAllSlots = async (req, res) => {
    try {
        const slots = await Slot.find().sort({ slotNumber: 1 });
        res.json(slots);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch slots" });
    }
};

exports.toggleMaintenance = async (req, res) => {
    try {
        const { id } = req.params;

        const slot = await Slot.findById(id);
        if (!slot) {
            return res.status(404).json({ error: "Slot not found" });
        }

        slot.isOutOfOrder = !slot.isOutOfOrder;
        slot.lastUpdated = new Date();
        await slot.save();

        res.json({
            message: "Slot maintenance status updated",
            isOutOfOrder: slot.isOutOfOrder
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to toggle maintenance" });
    }
};
