const projects = [
  {
    id: "01",
    title: "Sales & Customer Analytics Dashboard",
    role: "Business Intelligence & Customer Insights",
    year: "Aug 2025",
    tags: ["Power BI", "Power Query", "DAX", "Excel"],
    image: "/images/projects/sales-customer-analytics.jpeg",
    gallery: [
      "/images/projects/sales-customer-analytics.jpeg",
      "/images/projects/sales-performance-analytics.jpeg",
    ],
    summary:
      "End-to-end Power BI analytics suite modeling 8,000+ sales records with custom DAX measures for executive reporting across 3 business units.",
    description:
      "Engineered an interactive Power BI dashboard suite connecting customer telemetry, sales performance, and profitability metrics. Using Power Query and advanced DAX modeling, this solution automates monthly recurring revenue tracking, customer retention scoring, and discount impact across multiple regional channels.",
    challenge:
      "Business units struggled with disparate Excel reports, inconsistent margin formulas, and a 5-day monthly lag in preparing sales and customer cohort numbers.",
    solution:
      "Modeled 8,000+ sales records using Power Query to clean, merge, and structure transactions into an optimized data model. Formulated 7 custom DAX measures tracking revenue, MoM growth, profit per unit, and retention tiers.",
    metrics: [
      { label: "Sales Records Modeled", value: "8,000+" },
      { label: "Data Prep Time Cut", value: "-35%" },
      { label: "Custom DAX Measures", value: "07" },
      { label: "Business Units Adopted", value: "3 Teams" },
    ],
    highlights: [
      "Modeled 8,000+ sales records using Power Query, reducing data preparation time by 35%",
      "Built 7 custom DAX measures for revenue, MoM growth and retention, adopted by 3 business units for regular reporting",
      "Created dual analytical views: Executive Sales Performance and Granular Customer Insights",
      "Interactive slicers for sales reps, product categories (Clothing, Electronics, Food, Furniture), and sales channels",
    ],
  },
  {
    id: "02",
    title: "Azure E-Commerce Sales Analytics Dashboard",
    role: "Cloud Data Engineering & Analytics",
    year: "Aug 2026",
    tags: ["Azure Databricks", "Power BI", "DAX", "Cloud ETL"],
    image: "/images/projects/sales-performance-analytics.jpeg",
    gallery: [
      "/images/projects/sales-performance-analytics.jpeg",
      "/images/projects/sales-customer-analytics.jpeg",
    ],
    summary:
      "Cloud-based transaction analytics platform processing 17,000+ orders across 5,000+ customers using Azure Databricks and a 7-table star schema.",
    description:
      "Architected an enterprise-grade cloud data pipeline and star schema dimensional model to monitor high-volume e-commerce transactions. Built on Azure Databricks for ingestion and transformation, the solution feeds real-time KPIs into an executive Power BI command dashboard.",
    challenge:
      "Fast-growing e-commerce operations generated over 17,000 orders across disparate customer touchpoints without a unified schema, making real-time order tracking and customer LTV calculation impossible.",
    solution:
      "Designed a robust data pipeline and a 7-table star schema from raw e-commerce transaction data. Developed a high-density Power BI dashboard tracking 10+ core KPIs including gross profit, regional delivery volume, and customer lifetime engagement.",
    metrics: [
      { label: "Orders Analyzed", value: "17,000+" },
      { label: "Customers Tracked", value: "5,000+" },
      { label: "Star Schema Tables", value: "7 Tables" },
      { label: "Live Core KPIs", value: "10+ KPIs" },
    ],
    highlights: [
      "Designed an automated data pipeline and a 7-table star schema from e-commerce transaction data",
      "Developed an interactive Power BI dashboard tracking 10+ KPIs across 17,000+ orders and 5,000+ customers",
      "Optimized Azure Databricks transformation scripts to handle multi-region currency conversions and order statuses",
      "Built custom DAX time-intelligence calculations to surface month-over-month sales velocity",
    ],
  },
  {
    id: "03",
    title: "Road Accident Data Analysis (EDA)",
    role: "Exploratory Data Analysis & Statistical Modeling",
    year: "Feb 2026",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    image: "/images/projects/road-accident-analysis.svg",
    gallery: ["/images/projects/road-accident-analysis.svg"],
    summary:
      "Comprehensive exploratory analysis of 15,000+ traffic incident records identifying 5 critical risk patterns and delivering 12+ visualizations for stakeholder policy.",
    description:
      "Conducted in-depth exploratory data analysis (EDA) on a 15,000+ row road accident dataset using Python. Engineered an automated cleaning pipeline addressing null values, type anomalies, and outliers, then generated multivariate statistical charts uncovering critical environmental collision factors.",
    challenge:
      "The raw dataset contained extensive missing GPS data, inconsistent casualty classifications, and duplicate incident logs that prevented public safety stakeholders from extracting actionable policy insights.",
    solution:
      "Cleaned a 15,000+ row dataset with Pandas & NumPy, boosting data usability by 40%. Identified 5 critical accident patterns (including peak twilight collision hours and surface moisture multipliers) and delivered 12+ visualizations in a formal stakeholder report.",
    metrics: [
      { label: "Incident Rows Cleaned", value: "15,000+" },
      { label: "Usability Improvement", value: "+40%" },
      { label: "Accident Patterns Found", value: "05 Key" },
      { label: "Stakeholder Plots", value: "12+ Visuals" },
    ],
    highlights: [
      "Cleaned a 15,000+ row dataset (missing values, duplicates, incorrect types), improving usability by 40%",
      "Identified 5 critical accident patterns and presented 12+ visualizations in a written stakeholder report",
      "Developed Seaborn correlation heatmaps linking road surface conditions, speed limits, and casualty severity",
      "Synthesized findings into an executive presentation for traffic safety policy planners",
    ],
  },
  {
    id: "04",
    title: "Superstore Sales Data Analysis",
    role: "Database Normalization & Revenue Optimization",
    year: "Jul 2025",
    tags: ["PostgreSQL", "MySQL", "Excel", "Data Modeling"],
    image: "/images/projects/superstore-sales-analysis.svg",
    gallery: ["/images/projects/superstore-sales-analysis.svg"],
    summary:
      "Relational database normalization (3NF) of 10,000+ records and SQL revenue analysis uncovering the top 3 segments driving 60% of total sales.",
    description:
      "Transformed a flat, unnormalized 10,000+ record commercial dataset into a robust 3rd Normal Form (3NF) relational architecture across PostgreSQL and MySQL. Wrote complex analytical queries to isolate customer buying behaviors and streamline revenue reporting.",
    challenge:
      "Severe data redundancy in flat spreadsheets caused update anomalies, reporting errors, and an unacceptably low data quality score of 72%.",
    solution:
      "Normalized the 10,000+ record dataset into 4 relational tables (3NF), eliminating 30% data redundancy. Raised overall data quality from 72% to 97% and wrote window aggregation queries identifying the top 3 segments driving 60% of revenue.",
    metrics: [
      { label: "Data Quality Score", value: "97%" },
      { label: "Redundancy Cut (3NF)", value: "-30%" },
      { label: "Top Segments Revenue", value: "60%" },
      { label: "Records Normalized", value: "10,000+" },
    ],
    highlights: [
      "Normalized a 10,000+ record dataset into 4 relational tables (3NF), eliminating 30% data redundancy",
      "Identified the top 3 market segments driving 60% of revenue and raised data quality from 72% to 97%",
      "Engineered primary and foreign key constraints in PostgreSQL to maintain referential integrity",
      "Authored optimized SQL window functions and subqueries for multi-level sales cohort analysis",
    ],
  },
];

export default projects;