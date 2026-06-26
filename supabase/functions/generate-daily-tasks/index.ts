import { createClient } from "npm:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const adminTemplates = [
  "OT Oxygen Cylinder Status Verification",
  "Emergency Drug Crash Cart Verification",
  "Generator Diesel Level Check",
  "Laparoscopy CO₂ Cylinder Status Check",
  "Overhead Water Tank Level Check",
  "RO Drinking Water System Check",
  "OT Linen Sterilization & Availability Check",
  "Hospital Linen Inventory Check",
  "Cleaning Supplies Stock Verification",
  "STP Operational Run Verification",
];

Deno.serve(async () => {
  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const { data: existingTasks } =
    await supabase
      .from("tasks")
      .select("id");

  const existingIds =
    new Set(
      (existingTasks || []).map(
        (task: any) => task.id
      )
    );

  const tasksToInsert: any[] = [];

  adminTemplates.forEach(
    (title, index) => {
      const id =
        `ADMIN-${today}-${index + 1}`;

      if (!existingIds.has(id)) {
        tasksToInsert.push({
          id,
          title,
          status: "PENDING",
          status_color: "#D97706",
          assigned: "Administration",
          due: "Today",
          due_date: today,
          task_category: "ADMIN",
          type: "ADMIN",
        });
      }
    }
  );

  const { data: patients } =
    await supabase
      .from("patients")
      .select("*")
      .eq("active", true);

  const vitalsTimes = [
    "06:00 AM",
    "10:00 AM",
    "02:00 PM",
    "06:00 PM",
    "10:00 PM",
    "02:00 AM",
  ];

  (patients || []).forEach(
    (patient: any) => {
      vitalsTimes.forEach(
        (time) => {
          const id =
            `VITALS-${today}-${patient.id}-${time}`;

          if (
            !existingIds.has(id)
          ) {
            tasksToInsert.push({
              id,
              title:
                `${time} Vitals Assessment`,
              status: "PENDING",
              status_color: "#D97706",
              assigned:
                "Nursing Staff",
              due: time,
              due_date: today,
              due_time: time,
              priority: "HIGH",
              escalation_minutes: 30,
              location:
                patient.ward,
              task_category:
                "PATIENT",
              patient_id:
                patient.id,
              patient_name:
                patient.name,
              type: "VITALS",
            });
          }
        }
      );
    }
  );

  if (
    tasksToInsert.length > 0
  ) {
    const { error } =
      await supabase
        .from("tasks")
        .insert(tasksToInsert);

    if (error) {
      return new Response(
        JSON.stringify(error),
        { status: 500 }
      );
    }
  }

  return new Response(
    JSON.stringify({
      inserted:
        tasksToInsert.length,
    }),
    {
      headers: {
        "Content-Type":
          "application/json",
      },
    }
  );
});