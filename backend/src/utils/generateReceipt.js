const PDFDocument = require("pdfkit");

module.exports = function generateReceipt(res, session, user) {
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=SmartParkX_${session._id}.pdf`
    );

    doc.pipe(res);

    // ---------- HEADER ----------
    doc
        .fontSize(20)
        .text("SmartParkX Parking Receipt", { align: "center" })
        .moveDown(2);

    // ---------- USER INFO ----------
    doc.fontSize(12);
    doc.text(`Name: ${user.name}`);
    doc.text(`Vehicle Number: ${session.vehicleNumber}`);
    doc.text(`Parking Location: SmartParkX Campus`);
    doc.moveDown();

    // ---------- SESSION INFO ----------
    doc.text(`Entry Time: ${session.entryTime}`);
    doc.text(`Exit Time: ${session.exitTime}`);
    doc.text(`Duration: ${Math.ceil(
        (session.exitTime - session.entryTime) / 60000
    )} minutes`);
    doc.moveDown();

    // ---------- BILL ----------
    doc
        .fontSize(14)
        .text(`Total Amount Paid: ₹${session.billAmount}`, {
            underline: true,
        });

    doc.moveDown(2);

    doc
        .fontSize(10)
        .text("Thank you for using SmartParkX 🚗", { align: "center" });

    doc.end();
};
