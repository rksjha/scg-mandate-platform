Its SCG Proposal Intelligence file
Updated HTML is ready. Here's a complete summary of what's done and what you need to do next for the live subdomain.
✅ What's Updated in the HTML
Entity Master — All 6 SCG Entities now embedded:
#EntityGSTIN
Shiva Consultancy Group (Group of Companies)—
Shiva CSG Pvt. Ltd.24AAQCS9937H1ZO
Drishti Biotech Pvt. Ltd.24AADCD0342G2Z8
SHIVEENA Foundation (Section 8 NGO)—
Shubham Agribusiness & Financial Solution 24ADZPJ6617N2ZQ6
JR Enterprises
When you select any entity in Mandate Builder — the GSTIN auto-appears in a gold strip AND prints on the mandate letterhead.
New Tab — 🔗 Integration & Export:
Webhook URL + API key config → POST mandate JSON to any CRM/ERP
Auto-send toggle — fires automatically on "Generate Mandate"
Export as JSON / CSV download
Test webhook button
System Paths panel (mandate.msmeintelligence.in, repo, DNS)
🔧 To Deploy mandate.msmeintelligence.in — Do This Once
Step 1 — Create GitHub Repo (takes 2 min)
Go to github.com → New Repository → Name: scg-mandate-platform
Set to Public
Upload this HTML file renamed as index.html
Go to Settings → Pages → Source: main branch → Save
Your file will be live at: rksjha.github.io/scg-mandate-platform
Step 2 — Add CNAME file in repo
Create a file named exactly CNAME (no extension) with just this one line:
mandate.msmeintelligence.in
