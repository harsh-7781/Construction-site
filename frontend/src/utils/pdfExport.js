import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// ── Brand Colors ───────────────────────────────────────────
const COLORS = {
  primary:    [37,  99,  235],  // blue-600
  dark:       [15,  23,  42],   // slate-950
  slate800:   [30,  41,  59],   // slate-800
  slate600:   [71,  85,  105],  // slate-600
  slate400:   [148, 163, 184],  // slate-400
  slate200:   [226, 232, 240],  // slate-200
  white:      [255, 255, 255],
  green:      [22,  163, 74],
  red:        [220, 38,  38],
  amber:      [217, 119, 6],
}

// ── Helpers ────────────────────────────────────────────────
// const formatINR = (n) => {
//   if (!n) return '₹0'
//   if (n >= 10000000) return `Rs. ${(n / 10000000).toFixed(2)} Cr`
//   if (n >= 100000)   return `Rs. ${(n / 100000).toFixed(2)} L`
//   return `Rs. ${new Intl.NumberFormat('en-IN').format(n)}`
// }

const today = () => new Date().toLocaleDateString('en-IN', {
  day: '2-digit', month: 'short', year: 'numeric'
})

// ── Header (used in all PDFs) ──────────────────────────────
const drawHeader = (doc, title, subtitle, docNumber) => {
  const W = doc.internal.pageSize.getWidth()

  // Dark header background
  doc.setFillColor(...COLORS.dark)
  doc.rect(0, 0, W, 42, 'F')

  // Blue accent bar
  doc.setFillColor(...COLORS.primary)
  doc.rect(0, 42, W, 3, 'F')

  // Company name
  doc.setTextColor(...COLORS.white)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('ConstructOS', 14, 16)

  // Company tagline
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...COLORS.slate400)
  doc.text('Design. Build. Deliver.', 14, 23)

  // Company details (right side)
  doc.setFontSize(7)
  doc.setTextColor(...COLORS.slate400)
  doc.text('ConstructOS Pvt Ltd', W - 14, 12, { align: 'right' })
  doc.text('Office 402, BKC, Mumbai 400051', W - 14, 18, { align: 'right' })
  doc.text('info@constructos.com | +91 98200 00000', W - 14, 24, { align: 'right' })
  doc.text('GSTIN: 27AABCU9603R1ZX', W - 14, 30, { align: 'right' })

  // Document title block
  doc.setFillColor(...COLORS.primary)
  doc.roundedRect(14, 52, 90, 22, 3, 3, 'F')
  doc.setTextColor(...COLORS.white)
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.text(title, 20, 63)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text(subtitle, 20, 70)

  // Document number (right)
  doc.setTextColor(...COLORS.slate600)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text(docNumber, W - 14, 60, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.slate400)
  doc.text(`Date: ${today()}`, W - 14, 68, { align: 'right' })

  return 85 // return Y position after header
}

// ── Footer (used in all PDFs) ──────────────────────────────
const drawFooter = (doc, pageNum, totalPages) => {
  const W = doc.internal.pageSize.getWidth()
  const H = doc.internal.pageSize.getHeight()

  doc.setFillColor(...COLORS.slate200)
  doc.rect(0, H - 14, W, 14, 'F')

  doc.setFontSize(7)
  doc.setTextColor(...COLORS.slate600)
  doc.setFont('helvetica', 'normal')
  doc.text('ConstructOS Pvt Ltd | www.constructos.com | All rights reserved', 14, H - 5)
  doc.text(`Page ${pageNum} of ${totalPages}`, W - 14, H - 5, { align: 'right' })
}

// ── Section Label ──────────────────────────────────────────
const sectionLabel = (doc, text, y) => {
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.primary)
  doc.text(text.toUpperCase(), 14, y)
  doc.setDrawColor(...COLORS.primary)
  doc.setLineWidth(0.3)
  doc.line(14, y + 1, 196, y + 1)
  return y + 7
}

// ══════════════════════════════════════════════════════════
// 1. QUOTATION PDF
// ══════════════════════════════════════════════════════════
export const generateQuotationPDF = (quotation) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W   = doc.internal.pageSize.getWidth()

  // Header
  let y = drawHeader(doc, 'QUOTATION', 'Bill of Quantities', quotation.id || 'QT-DRAFT')

  // ── Client & Project Info ──
  y = sectionLabel(doc, 'Client & Project Details', y)

  // Two column info boxes
  // Left box
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(14, y, 86, 32, 2, 2, 'F')
  doc.setDrawColor(...COLORS.slate200)
  doc.setLineWidth(0.3)
  doc.roundedRect(14, y, 86, 32, 2, 2, 'S')

  doc.setFontSize(7)
  doc.setTextColor(...COLORS.slate400)
  doc.setFont('helvetica', 'bold')
  doc.text('BILLED TO', 18, y + 7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...COLORS.dark)
  doc.setFontSize(9)
  doc.text(quotation.client || 'Client Name', 18, y + 14)
  doc.setFontSize(7)
  doc.setTextColor(...COLORS.slate600)
  doc.text(quotation.clientAddress || 'Client Address', 18, y + 20)
  doc.text(quotation.clientGST || 'GSTIN: —', 18, y + 26)
  doc.text(quotation.clientContact || '', 18, y + 32)

  // Right box
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(104, y, 86, 32, 2, 2, 'F')
  doc.setDrawColor(...COLORS.slate200)
  doc.roundedRect(104, y, 86, 32, 2, 2, 'S')

  doc.setFontSize(7)
  doc.setTextColor(...COLORS.slate400)
  doc.setFont('helvetica', 'bold')
  doc.text('PROJECT DETAILS', 108, y + 7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...COLORS.dark)
  doc.setFontSize(9)
  doc.text(quotation.project || 'Project Name', 108, y + 14)
  doc.setFontSize(7)
  doc.setTextColor(...COLORS.slate600)
  doc.text(`Service: ${quotation.service || '—'}`, 108, y + 20)
  doc.text(`Type: ${quotation.contractType || '—'}`, 108, y + 26)
  doc.text(`Valid for: ${quotation.validDays || 30} days`, 108, y + 32)

  y += 40

  // ── BOQ Table ──
  y = sectionLabel(doc, 'Bill of Quantities', y)

  const items = quotation.items || [
    { description: 'Excavation and earthwork',     unit: 'M³',  qty: 250,  rate: 850,   amount: 212500 },
    { description: 'RCC (M25) — Columns & Beams',  unit: 'M³',  qty: 85,   rate: 8500,  amount: 722500 },
    { description: 'Brickwork (230mm)',             unit: 'M²',  qty: 1200, rate: 680,   amount: 816000 },
    { description: 'Plastering (12mm)',             unit: 'M²',  qty: 2400, rate: 185,   amount: 444000 },
    { description: 'Waterproofing — Basement',      unit: 'M²',  qty: 350,  rate: 450,   amount: 157500 },
  ]

  autoTable(doc, {
    startY: y,
    head: [['#', 'Description', 'Unit', 'Qty', 'Rate (Rs.)', 'Amount (Rs.)']],
    body: items.map((item, i) => [
      i + 1,
      item.description,
      item.unit,
      item.qty,
      new Intl.NumberFormat('en-IN').format(item.rate),
      new Intl.NumberFormat('en-IN').format(item.amount),
    ]),
    headStyles: {
      fillColor: COLORS.primary,
      textColor: COLORS.white,
      fontSize: 8,
      fontStyle: 'bold',
      cellPadding: 4,
    },
    bodyStyles: {
      fontSize: 8,
      textColor: COLORS.dark,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 8,  halign: 'center' },
      1: { cellWidth: 80 },
      2: { cellWidth: 16, halign: 'center' },
      3: { cellWidth: 16, halign: 'right'  },
      4: { cellWidth: 28, halign: 'right'  },
      5: { cellWidth: 30, halign: 'right'  },
    },
    margin: { left: 14, right: 14 },
    styles: { overflow: 'linebreak' },
  })

  y = doc.lastAutoTable.finalY + 6

  // ── Summary Box ──
  const subtotal  = items.reduce((s, i) => s + Number(i.amount), 0)
  const discount  = subtotal * ((quotation.discountPct || 0) / 100)
  const taxable   = subtotal - discount
  const gst       = taxable * ((quotation.gstPct || 18) / 100)
  const total     = taxable + gst

  const summaryX = 120
  const summaryW = 76

  doc.setFillColor(248, 250, 252)
  doc.roundedRect(summaryX, y, summaryW, 50, 2, 2, 'F')
  doc.setDrawColor(...COLORS.slate200)
  doc.roundedRect(summaryX, y, summaryW, 50, 2, 2, 'S')

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')

  const rows = [
    ['Subtotal',                        `Rs. ${new Intl.NumberFormat('en-IN').format(subtotal)}`],
    [`Discount (${quotation.discountPct || 0}%)`, `- Rs. ${new Intl.NumberFormat('en-IN').format(discount)}`],
    [`GST (${quotation.gstPct || 18}%)`, `Rs. ${new Intl.NumberFormat('en-IN').format(gst)}`],
  ]

  rows.forEach((row, i) => {
    doc.setTextColor(...COLORS.slate600)
    doc.text(row[0], summaryX + 5, y + 10 + (i * 8))
    doc.setTextColor(...COLORS.dark)
    doc.text(row[1], summaryX + summaryW - 5, y + 10 + (i * 8), { align: 'right' })
  })

  // Total line
  doc.setDrawColor(...COLORS.primary)
  doc.setLineWidth(0.5)
  doc.line(summaryX + 5, y + 36, summaryX + summaryW - 5, y + 36)

  doc.setFillColor(...COLORS.primary)
  doc.roundedRect(summaryX, y + 38, summaryW, 12, 2, 2, 'F')
  doc.setTextColor(...COLORS.white)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('TOTAL', summaryX + 5, y + 46)
  doc.text(`Rs. ${new Intl.NumberFormat('en-IN').format(total)}`, summaryX + summaryW - 5, y + 46, { align: 'right' })

  y += 58

  // ── Terms ──
  if (y < 230) {
    y = sectionLabel(doc, 'Terms & Conditions', y)
    doc.setFontSize(7.5)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...COLORS.slate600)
    const terms = quotation.notes ||
      'Payment terms: 30% advance, 40% at midpoint, 30% on completion. ' +
      'This quotation is valid for 30 days from the date of issue. ' +
      'Prices are subject to change if scope of work is modified. ' +
      'GST as applicable will be charged extra on all items.'
    const lines = doc.splitTextToSize(terms, 170)
    doc.text(lines, 14, y)
    y += lines.length * 4 + 6
  }

  // ── Signature ──
  if (y < 245) {
    y = Math.max(y, 230)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...COLORS.dark)
    doc.text('For ConstructOS Pvt Ltd', 14, y + 10)
    doc.setDrawColor(...COLORS.slate400)
    doc.setLineWidth(0.3)
    doc.line(14, y + 24, 70, y + 24)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...COLORS.slate400)
    doc.text('Authorized Signatory', 14, y + 28)

    doc.text('Client Acceptance', W - 70, y + 10)
    doc.line(W - 70, y + 24, W - 14, y + 24)
    doc.text('Client Signature & Stamp', W - 70, y + 28)
  }

  // Footer
  drawFooter(doc, 1, 1)

  doc.save(`Quotation-${quotation.id || 'Draft'}-${quotation.client || 'Client'}.pdf`)
}

// ══════════════════════════════════════════════════════════
// 2. INVOICE PDF
// ══════════════════════════════════════════════════════════
export const generateInvoicePDF = (invoice) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W   = doc.internal.pageSize.getWidth()

  // Header
  let y = drawHeader(doc, 'TAX INVOICE', invoice.project || 'Project Name', invoice.id || 'INV-001')

  // ── Invoice Status Badge ──
  const statusColor = invoice.status === 'paid' ? COLORS.green :
                      invoice.status === 'overdue' ? COLORS.red : COLORS.amber
  doc.setFillColor(...statusColor)
  doc.roundedRect(W - 50, 52, 36, 10, 2, 2, 'F')
  doc.setTextColor(...COLORS.white)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text((invoice.status || 'PENDING').toUpperCase(), W - 32, 58, { align: 'center' })

  // ── Bill To / Bill From ──
  y = sectionLabel(doc, 'Invoice Information', y)

  // Left — Bill To
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(14, y, 86, 38, 2, 2, 'F')
  doc.setDrawColor(...COLORS.slate200)
  doc.roundedRect(14, y, 86, 38, 2, 2, 'S')
  doc.setFontSize(7)
  doc.setTextColor(...COLORS.slate400)
  doc.setFont('helvetica', 'bold')
  doc.text('BILL TO', 18, y + 7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...COLORS.dark)
  doc.setFontSize(9)
  doc.text(invoice.client || 'Client Name', 18, y + 14)
  doc.setFontSize(7)
  doc.setTextColor(...COLORS.slate600)
  doc.text(invoice.clientAddress || 'Client Address', 18, y + 20)
  doc.text(`Project: ${invoice.project || '—'}`, 18, y + 26)
  doc.text(`PO Ref: ${invoice.poRef || '—'}`, 18, y + 32)

  // Right — Invoice Details
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(104, y, 86, 38, 2, 2, 'F')
  doc.setDrawColor(...COLORS.slate200)
  doc.roundedRect(104, y, 86, 38, 2, 2, 'S')
  doc.setFontSize(7)
  doc.setTextColor(...COLORS.slate400)
  doc.setFont('helvetica', 'bold')
  doc.text('INVOICE DETAILS', 108, y + 7)

  const details = [
    ['Invoice No.',  invoice.id       || 'INV-001'],
    ['Invoice Date', invoice.raised   || today()  ],
    ['Due Date',     invoice.due      || '—'      ],
    ['Invoice Type', invoice.type     || 'Progress'],
    ['Payment Terms','30 days'                    ],
  ]

  details.forEach((row, i) => {
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...COLORS.slate400)
    doc.text(row[0], 108, y + 14 + (i * 6))
    doc.setTextColor(...COLORS.dark)
    doc.setFont('helvetica', 'bold')
    doc.text(row[1], 185, y + 14 + (i * 6), { align: 'right' })
  })

  y += 46

  // ── Line Items Table ──
  y = sectionLabel(doc, 'Invoice Items', y)

  const invoiceItems = invoice.items || [
    { description: `${invoice.type || 'Progress'} Invoice — ${invoice.project || 'Project'}`, qty: 1, rate: invoice.amount || 0, amount: invoice.amount || 0 },
  ]

  autoTable(doc, {
    startY: y,
    head: [['#', 'Description', 'Qty', 'Rate (Rs.)', 'Amount (Rs.)']],
    body: invoiceItems.map((item, i) => [
      i + 1,
      item.description,
      item.qty || 1,
      new Intl.NumberFormat('en-IN').format(item.rate || item.amount),
      new Intl.NumberFormat('en-IN').format(item.amount),
    ]),
    headStyles: {
      fillColor: COLORS.primary,
      textColor: COLORS.white,
      fontSize: 8,
      fontStyle: 'bold',
      cellPadding: 4,
    },
    bodyStyles: {
      fontSize: 8,
      cellPadding: 3,
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 90 },
      2: { cellWidth: 20, halign: 'right' },
      3: { cellWidth: 30, halign: 'right' },
      4: { cellWidth: 32, halign: 'right' },
    },
    margin: { left: 14, right: 14 },
  })

  y = doc.lastAutoTable.finalY + 6

  // ── Amount Summary ──
  const baseAmount = invoice.amount || 0
  const gst        = baseAmount * 0.18
  const total      = baseAmount + gst

  const sx = 120, sw = 76
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(sx, y, sw, 46, 2, 2, 'F')
  doc.setDrawColor(...COLORS.slate200)
  doc.roundedRect(sx, y, sw, 46, 2, 2, 'S')

  const amountRows = [
    ['Taxable Amount', `Rs. ${new Intl.NumberFormat('en-IN').format(baseAmount)}`],
    ['CGST (9%)',      `Rs. ${new Intl.NumberFormat('en-IN').format(gst / 2)}`],
    ['SGST (9%)',      `Rs. ${new Intl.NumberFormat('en-IN').format(gst / 2)}`],
  ]

  amountRows.forEach((row, i) => {
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...COLORS.slate600)
    doc.text(row[0], sx + 5, y + 9 + (i * 8))
    doc.setTextColor(...COLORS.dark)
    doc.text(row[1], sx + sw - 5, y + 9 + (i * 8), { align: 'right' })
  })

  doc.setFillColor(...COLORS.primary)
  doc.roundedRect(sx, y + 34, sw, 12, 2, 2, 'F')
  doc.setTextColor(...COLORS.white)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('TOTAL DUE', sx + 5, y + 42)
  doc.text(`Rs. ${new Intl.NumberFormat('en-IN').format(total)}`, sx + sw - 5, y + 42, { align: 'right' })

  y += 54

  // ── Bank Details ──
  if (y < 230) {
    y = sectionLabel(doc, 'Bank Details', y)
    doc.setFillColor(248, 250, 252)
    doc.roundedRect(14, y, 86, 30, 2, 2, 'F')
    doc.setDrawColor(...COLORS.slate200)
    doc.roundedRect(14, y, 86, 30, 2, 2, 'S')

    const bankDetails = [
      ['Bank Name',    'HDFC Bank Ltd'],
      ['Account No.',  '1234 5678 9012'],
      ['IFSC Code',    'HDFC0001234'],
      ['Account Type', 'Current Account'],
    ]

    bankDetails.forEach((row, i) => {
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...COLORS.slate400)
      doc.text(row[0], 18, y + 8 + (i * 6))
      doc.setTextColor(...COLORS.dark)
      doc.setFont('helvetica', 'bold')
      doc.text(row[1], 70, y + 8 + (i * 6))
    })

    // Notes
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...COLORS.slate400)
    doc.text('Please mention Invoice No. in payment reference.', 104, y + 8)
    doc.text('Payment within due date is appreciated.', 104, y + 14)
    doc.text('Late payment may attract interest @ 1.5% per month.', 104, y + 20)

    y += 38
  }

  // ── Signature ──
  y = Math.max(y, 242)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.dark)
  doc.text('For ConstructOS Pvt Ltd', 14, y)
  doc.setDrawColor(...COLORS.slate400)
  doc.setLineWidth(0.3)
  doc.line(14, y + 14, 70, y + 14)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...COLORS.slate400)
  doc.text('Authorized Signatory', 14, y + 18)

  drawFooter(doc, 1, 1)
  doc.save(`Invoice-${invoice.id || 'Draft'}-${invoice.client || 'Client'}.pdf`)
}

// ══════════════════════════════════════════════════════════
// 3. CONTRACT PDF
// ══════════════════════════════════════════════════════════
export const generateContractPDF = (contract) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
//   const W   = doc.internal.pageSize.getWidth()

  // Header
  let y = drawHeader(doc, 'CONTRACT', contract.type || 'Construction Agreement', contract.id || 'CON-DRAFT')

  // ── Parties ──
  y = sectionLabel(doc, 'Parties to the Agreement', y)

  // Party A
  doc.setFillColor(239, 246, 255)
  doc.roundedRect(14, y, 86, 36, 2, 2, 'F')
  doc.setDrawColor(...COLORS.primary)
  doc.setLineWidth(0.5)
  doc.line(14, y, 14, y + 36)
  doc.setLineWidth(0.2)
  doc.roundedRect(14, y, 86, 36, 2, 2, 'S')

  doc.setFontSize(7)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.primary)
  doc.text('PARTY A — CONTRACTOR', 18, y + 7)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.dark)
  doc.setFontSize(9)
  doc.text('ConstructOS Pvt Ltd', 18, y + 14)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...COLORS.slate600)
  doc.text('Office 402, BKC, Mumbai 400051', 18, y + 20)
  doc.text('GSTIN: 27AABCU9603R1ZX', 18, y + 26)
  doc.text('Rep. by: Rajesh Mehta (CEO)', 18, y + 32)

  // Party B
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(104, y, 86, 36, 2, 2, 'F')
  doc.setDrawColor(...COLORS.slate200)
  doc.roundedRect(104, y, 86, 36, 2, 2, 'S')

  doc.setFontSize(7)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.slate600)
  doc.text('PARTY B — CLIENT', 108, y + 7)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.dark)
  doc.setFontSize(9)
  doc.text(contract.client || 'Client Name', 108, y + 14)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...COLORS.slate600)
  doc.text('As per registered address', 108, y + 20)
  doc.text(`Contact: ${contract.clientContact || '—'}`, 108, y + 26)
  doc.text(`Rep. by: ${contract.clientContact || 'Authorized Person'}`, 108, y + 32)

  y += 44

  // ── Key Terms ──
  y = sectionLabel(doc, 'Key Contract Terms', y)

  const terms = [
    ['Contract No.',     contract.id           || '—'],
    ['Project Name',     contract.project       || '—'],
    ['Contract Type',    contract.type          || '—'],
    ['Service',          contract.service       || '—'],
    ['Contract Value',   contract.value         || '—'],
    ['Start Date',       contract.startDate     || '—'],
    ['End Date',         contract.endDate       || '—'],
    ['Site Location',    contract.site          || '—'],
    ['Payment Terms',    contract.paymentTerms  || '—'],
    ['Delay Penalty',    `${contract.penalty || 0.5}% per week`],
    ['Defect Liability', `${contract.dpl || 12} months`],
    ['Signed Date',      contract.signedDate    || 'Pending'],
  ]

  autoTable(doc, {
    startY: y,
    body: terms.map(([k, v]) => [k, v]),
    bodyStyles: { fontSize: 8, cellPadding: 3 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: 'bold', textColor: COLORS.slate600 },
      1: { cellWidth: 136, textColor: COLORS.dark },
    },
    margin: { left: 14, right: 14 },
    tableLineColor: COLORS.slate200,
    tableLineWidth: 0.2,
  })

  y = doc.lastAutoTable.finalY + 6

  // ── Clauses (new page if needed) ──
  if (y > 200) {
    doc.addPage()
    drawFooter(doc, 1, 2)
    y = 20
  }

  y = sectionLabel(doc, 'Contract Clauses', y)

  const clauses = contract.clauses || [
    { title: 'Scope of Work',               category: 'Scope'      },
    { title: 'Payment Terms & Schedule',    category: 'Payment'    },
    { title: 'Project Timeline & Milestones',category: 'Timeline'  },
    { title: 'Quality Standards & Testing', category: 'Quality'    },
    { title: 'Health & Safety Compliance',  category: 'Safety'     },
    { title: 'Material Supply Responsibility',category:'Material'   },
    { title: 'Variation & Change Orders',   category: 'Changes'    },
    { title: 'Delay Penalty Clause',        category: 'Penalty'    },
    { title: 'Defect Liability Period',     category: 'Defect'     },
  ]

  clauses.forEach((clause, i) => {
    if (y > 260) {
      doc.addPage()
      drawFooter(doc, 2, 2)
      y = 20
    }

    doc.setFillColor(248, 250, 252)
    doc.roundedRect(14, y, 182, 12, 2, 2, 'F')
    doc.setDrawColor(...COLORS.slate200)
    doc.roundedRect(14, y, 182, 12, 2, 2, 'S')

    doc.setFillColor(...COLORS.primary)
    doc.circle(21, y + 6, 3, 'F')
    doc.setTextColor(...COLORS.white)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.text(String(i + 1), 21, y + 7, { align: 'center' })

    doc.setTextColor(...COLORS.dark)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text(clause.title, 28, y + 7)

    doc.setTextColor(...COLORS.slate400)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.text(clause.category, 185, y + 7, { align: 'right' })

    y += 15
  })

  // ── Signature Block ──
  y += 10
  if (y > 245) {
    doc.addPage()
    y = 20
  }

  y = sectionLabel(doc, 'Signatures', y)

  // Signature boxes
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(14, y, 86, 40, 2, 2, 'F')
  doc.setDrawColor(...COLORS.slate200)
  doc.roundedRect(14, y, 86, 40, 2, 2, 'S')

  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.dark)
  doc.text('Party A — ConstructOS Pvt Ltd', 18, y + 8)

  if (contract.signed) {
    doc.setFontSize(14)
    doc.setTextColor(...COLORS.primary)
    doc.setFont('helvetica', 'bolditalic')
    doc.text('Rajesh Mehta', 24, y + 24)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...COLORS.green)
    doc.text(`Digitally signed: ${contract.signedDate || today()}`, 18, y + 30)
  } else {
    doc.setDrawColor(...COLORS.slate400)
    doc.setLineWidth(0.3)
    doc.line(18, y + 30, 90, y + 30)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...COLORS.slate400)
    doc.text('Signature & Stamp', 18, y + 36)
  }

  doc.setFillColor(248, 250, 252)
  doc.roundedRect(104, y, 86, 40, 2, 2, 'F')
  doc.setDrawColor(...COLORS.slate200)
  doc.roundedRect(104, y, 86, 40, 2, 2, 'S')

  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.dark)
  doc.text(`Party B — ${contract.client || 'Client'}`, 108, y + 8)
  doc.setDrawColor(...COLORS.slate400)
  doc.setLineWidth(0.3)
  doc.line(108, y + 30, 180, y + 30)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...COLORS.slate400)
  doc.text('Signature & Stamp', 108, y + 36)

  y += 48

  // Legal note
  doc.setFontSize(7)
  doc.setTextColor(...COLORS.slate400)
  doc.setFont('helvetica', 'italic')
  const note = 'This contract is legally binding on both parties upon signature. Any disputes shall be subject to Mumbai jurisdiction.'
  doc.text(doc.splitTextToSize(note, 170), 14, y)

  drawFooter(doc, 2, 2)
  doc.save(`Contract-${contract.id || 'Draft'}-${contract.client || 'Client'}.pdf`)
}

// ══════════════════════════════════════════════════════════
// 4. PROJECT REPORT PDF
// ══════════════════════════════════════════════════════════
export const generateProjectReportPDF = (project) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W   = doc.internal.pageSize.getWidth()

  let y = drawHeader(doc, 'PROJECT REPORT', project.name || 'Project Name', project.id || 'PRJ-001')

  // ── Project Summary ──
  y = sectionLabel(doc, 'Project Summary', y)

  // Progress bar visual
  doc.setFillColor(...COLORS.slate200)
  doc.roundedRect(14, y, 182, 6, 3, 3, 'F')
  const progressWidth = (182 * (project.progress || 0)) / 100
  const progressColor = project.status === 'delayed'  ? COLORS.red   :
                        project.status === 'at-risk'  ? COLORS.amber : COLORS.primary
  doc.setFillColor(...progressColor)
  doc.roundedRect(14, y, progressWidth, 6, 3, 3, 'F')

  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.dark)
  doc.text(`${project.progress || 0}% Complete`, W / 2, y + 4.5, { align: 'center' })

  y += 12

  // Summary grid
  const summaryData = [
    ['Project ID',    project.id          || '—', 'Client',     project.client      || '—'],
    ['Service Type',  project.type        || '—', 'Status',     project.status      || '—'],
    ['Contract Value',project.value       || '—', 'Site',       project.site        || '—'],
    ['Start Date',    project.startDate   || '—', 'End Date',   project.endDate     || '—'],
    ['Project Manager',project.manager   || '—', 'Supervisor', project.supervisor  || '—'],
    ['Team Size',     `${project.team||0} workers`, 'Progress', `${project.progress||0}%`],
  ]

  autoTable(doc, {
    startY: y,
    body: summaryData.flatMap(([k1,v1,k2,v2]) => [[k1, v1, k2, v2]]),
    bodyStyles: { fontSize: 8, cellPadding: 3 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      0: { cellWidth: 40, fontStyle: 'bold', textColor: COLORS.slate600 },
      1: { cellWidth: 51, textColor: COLORS.dark },
      2: { cellWidth: 40, fontStyle: 'bold', textColor: COLORS.slate600 },
      3: { cellWidth: 51, textColor: COLORS.dark },
    },
    margin: { left: 14, right: 14 },
    tableLineColor: COLORS.slate200,
    tableLineWidth: 0.2,
  })

  y = doc.lastAutoTable.finalY + 6

  // ── Tasks ──
  y = sectionLabel(doc, 'Task Status', y)

  const tasks = project.tasks || []
  if (tasks.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [['Task', 'Assignee', 'Priority', 'Due', 'Status']],
      body: tasks.map(t => [
        t.title,
        t.assignee || '—',
        t.priority || '—',
        t.due      || '—',
        t.status   || '—',
      ]),
      headStyles: {
        fillColor: COLORS.primary,
        textColor: COLORS.white,
        fontSize: 7,
        fontStyle: 'bold',
        cellPadding: 3,
      },
      bodyStyles: { fontSize: 7, cellPadding: 2.5 },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      columnStyles: {
        0: { cellWidth: 70 },
        1: { cellWidth: 35 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 27 },
      },
      margin: { left: 14, right: 14 },
    })
    y = doc.lastAutoTable.finalY + 6
  }

  // ── Milestones ──
  if (project.milestones?.length > 0) {
    y = sectionLabel(doc, 'Milestones', y)
    autoTable(doc, {
      startY: y,
      head: [['Milestone', 'Target Date', 'Status']],
      body: project.milestones.map(m => [
        m.title,
        m.date || '—',
        m.done ? 'Completed' : 'Pending',
      ]),
      headStyles: {
        fillColor: COLORS.primary,
        textColor: COLORS.white,
        fontSize: 7,
        fontStyle: 'bold',
        cellPadding: 3,
      },
      bodyStyles: { fontSize: 7, cellPadding: 2.5 },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 50  },
        2: { cellWidth: 32  },
      },
      margin: { left: 14, right: 14 },
    })
    y = doc.lastAutoTable.finalY + 6
  }

  // ── Materials ──
  if (project.materials?.length > 0 && y < 220) {
    y = sectionLabel(doc, 'Material Status', y)
    autoTable(doc, {
      startY: y,
      head: [['Material', 'Available', 'Required', 'Status']],
      body: project.materials.map(m => [m.name, m.qty, m.required, m.status.toUpperCase()]),
      headStyles: {
        fillColor: COLORS.primary,
        textColor: COLORS.white,
        fontSize: 7,
        fontStyle: 'bold',
        cellPadding: 3,
      },
      bodyStyles: { fontSize: 7, cellPadding: 2.5 },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      margin: { left: 14, right: 14 },
    })
  }

  drawFooter(doc, 1, 1)
  doc.save(`ProjectReport-${project.id || 'Draft'}-${project.name || 'Project'}.pdf`)
}