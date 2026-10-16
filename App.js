let receipts = [
  { no: "RCT-001", guest: "Juan Dela Cruz", room: "201", total: 9400, paid: 9400, date: "2026-09-12" },
  { no: "RCT-002", guest: "Maria Santos",   room: "305", total: 7600, paid: 7600, date: "2026-09-14" },
  { no: "RCT-003", guest: "Pedro Reyes",    room: "102", total: 4200, paid: 3000, date: "2026-09-15" }
];

function peso(n) {
  return "₱" + Number(n).toLocaleString();
}

function showReceipts() {
  const text = document.getElementById("search").value.toLowerCase();
  let rows = "";

  for (const r of receipts) {
    const searchable = (r.no + " " + r.guest + " " + r.room + " " + r.date).toLowerCase();
    if (!searchable.includes(text)) continue;

    const balance = r.total - r.paid;
    const status = balance > 0 ? '<span class="balance">BALANCE</span>' : '<span class="paid">PAID</span>';
    rows += "<tr>" +
      "<td>" + r.no + "</td><td>" + r.guest + "</td><td>" + r.room + "</td>" +
      "<td>" + peso(r.total) + "</td><td>" + status + "</td><td>" + r.date + "</td>" +
      '<td><button onclick="viewReceipt(\'' + r.no + '\')">View</button></td></tr>';
  }

  document.getElementById("list").innerHTML = rows || "<tr><td colspan='7'>No transactions found.</td></tr>";
}

// 4. Show one receipt in the format required by the lab
function viewReceipt(no) {
  const r = receipts.find(x => x.no === no);
  const balance = r.total - r.paid;

  document.getElementById("receipt").textContent =
    "HOTEL RECEIPT\n" +
    "--------------------------------\n" +
    "Receipt No: " + r.no + "\n" +
    "Guest: " + r.guest + "\n" +
    "Room: " + r.room + "\n\n" +
    "Total Bill:   " + peso(r.total) + "\n" +
    "Amount Paid:  " + peso(r.paid) + "\n" +
    "Balance:      " + peso(balance) + "\n\n" +
    "Payment Status: " + (balance > 0 ? "BALANCE" : "PAID") + "\n" +
    "Check-out: " + r.date + "\n" +
    "--------------------------------\n" +
    "Thank you for staying with us!";

  document.getElementById("receiptBox").hidden = false;
  document.getElementById("receiptBox").scrollIntoView();
}

function generateReceipt() {
  const guest = document.getElementById("guest").value.trim();
  const room = document.getElementById("room").value.trim();
  const total = Number(document.getElementById("total").value);
  const paid = Number(document.getElementById("paid").value);
  const date = document.getElementById("date").value;

 
  if (!guest || !room || !date || total <= 0 || paid < 0) {
    alert("Please complete all fields with valid values.");
    return;
  }
  if (paid > total) {
    alert("Amount paid cannot be more than the total bill.");
    return;
  }

  const no = "RCT-" + String(receipts.length + 1).padStart(3, "0");
  receipts.push({ no: no, guest: guest, room: room, total: total, paid: paid, date: date });

  showReceipts();
  viewReceipt(no);
}

showReceipts();
