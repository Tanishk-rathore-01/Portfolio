import fs from "node:fs/promises";
import path from "node:path";

const outputPath = path.join(process.cwd(), "public", "Tanishk_Rathore_Resume.pdf");

const colors = {
  ink: [0.06, 0.08, 0.12],
  muted: [0.32, 0.38, 0.45],
  cyan: [0.0, 0.48, 0.66],
  lime: [0.36, 0.58, 0.1],
};

function escapePdfText(value) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function color([r, g, b]) {
  return `${r} ${g} ${b} rg`;
}

function text(value, x, y, size = 10, font = "F1", rgb = colors.ink) {
  return `${color(rgb)}\nBT /${font} ${size} Tf ${x} ${y} Td (${escapePdfText(value)}) Tj ET\n`;
}

function line(x1, y1, x2, y2, rgb = [0.82, 0.86, 0.88]) {
  return `${rgb.join(" ")} RG 0.8 w ${x1} ${y1} m ${x2} ${y2} l S\n`;
}

function wrap(value, maxChars) {
  const words = value.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function paragraph(value, x, y, maxChars, size = 9.5, leading = 14, font = "F1", rgb = colors.ink) {
  const lines = wrap(value, maxChars);
  let output = "";
  lines.forEach((lineText, index) => {
    output += text(lineText, x, y - index * leading, size, font, rgb);
  });
  return { output, nextY: y - lines.length * leading };
}

function object(id, body) {
  return `${id} 0 obj\n${body}\nendobj\n`;
}

function buildPdf(content) {
  const stream = `<< /Length ${Buffer.byteLength(content, "utf8")} >>\nstream\n${content}\nendstream`;
  const objects = [
    object(1, "<< /Type /Catalog /Pages 2 0 R >>"),
    object(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>"),
    object(
      3,
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    ),
    object(4, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),
    object(5, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"),
    object(6, stream),
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (const item of objects) {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += item;
  }

  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return pdf;
}

let y = 748;
let content = "";

content += text("Tanishk Rathore", 48, y, 24, "F2", colors.ink);
content += text("Full Stack Developer", 48, y - 24, 12, "F2", colors.cyan);
content += text("India | rathoretanishk11@gmail.com | github.com/Tanishk-rathore-01", 48, y - 42, 9.5, "F1", colors.muted);
content += line(48, y - 58, 564, y - 58);
y -= 84;

content += text("SUMMARY", 48, y, 10, "F2", colors.lime);
y -= 16;
let block = paragraph(
  "Full stack developer building polished, responsive web applications with React, TypeScript, Tailwind CSS, Node.js, Python, Supabase, PostgreSQL, and AI tooling. Combines practical product thinking, debugging discipline, and user-focused UI craft to ship projects that feel modern, usable, and production-minded.",
  48,
  y,
  98,
);
content += block.output;
y = block.nextY - 16;

content += text("CORE SKILLS", 48, y, 10, "F2", colors.lime);
y -= 16;
const skills = [
  "Frontend: JavaScript, TypeScript, HTML, CSS, React, Vue.js, Tailwind CSS",
  "Backend: Node.js, Python, REST API design, integration, validation, auth flows",
  "Data: PostgreSQL, Supabase, database design, query thinking, storage workflows",
  "Delivery: GitHub, Vercel, debugging, problem solving, AI tooling, prompt workflows",
];
for (const item of skills) {
  content += text(`- ${item}`, 58, y, 9.4, "F1", colors.ink);
  y -= 14;
}
y -= 8;

content += text("FEATURED PROJECTS", 48, y, 10, "F2", colors.lime);
y -= 18;
const projects = [
  [
    "EventraHQ",
    "Multi-tenant event operations SaaS with publishing, registrations, Razorpay test payments, QR check-in, organization roles, audit records, async jobs, and Supabase/PostgreSQL security boundaries.",
  ],
  [
    "PrepPilot / AI-Career-Forge",
    "AI career prep platform for mock interviews, readiness scoring, salary negotiation practice, resume matching, dashboards, auth, validation, and provider fallback logic.",
  ],
  [
    "Apex Health Care",
    "India-focused hospital management system with patient records, appointments, medical records, billing, pharmacy, reports, protected access, Supabase, charts, and typed workflows.",
  ],
  [
    "Cafe Au Latte",
    "Premium responsive cafe landing page with editorial layout, motion, menu filtering, reservation dialog, accessibility support, and responsive design QA.",
  ],
  [
    "VYOM Veloce",
    "Luxury vehicle marketplace with curated inventory, seller onboarding, modification studio, admin dashboard, Supabase auth, and Razorpay booking flow.",
  ],
];

for (const [title, detail] of projects) {
  content += text(title, 58, y, 9.8, "F2", colors.ink);
  block = paragraph(detail, 70, y - 13, 92, 8.8, 12.4, "F1", colors.muted);
  content += block.output;
  y = block.nextY - 8;
}

content += text("EXPERIENCE", 48, y, 10, "F2", colors.lime);
y -= 16;
content += text("HR Recruiter | 3 months", 58, y, 9.8, "F2", colors.ink);
y -= 14;
block = paragraph(
  "Built communication, candidate-screening, follow-up, and hiring-process awareness that supports recruiter-friendly product thinking.",
  70,
  y,
  92,
  8.8,
  12.4,
  "F1",
  colors.muted,
);
content += block.output;
y = block.nextY - 14;

content += text("EDUCATION", 48, y, 10, "F2", colors.lime);
y -= 16;
content += text("BCA | IAMR College, Duhai, Ghaziabad, Uttar Pradesh", 58, y, 9.4, "F1", colors.ink);
y -= 14;
content += text("Class 10 and 12 | Presidency The International School, Bhiwadi, Alwar, Rajasthan", 58, y, 9.4, "F1", colors.ink);

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, buildPdf(content), "binary");
console.log(`Wrote ${path.relative(process.cwd(), outputPath)}`);
