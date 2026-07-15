import { supabase }
  from '../lib/supabase';

export async function
getPatientTimeline(
  admissionId: string,
  patientId: string
) {

const [
  admission,
  consultations,
  medicationOrders,
  nursingNotes,
  dischargeSummary,
  labOrders,
  radiologyOrders,
] = await Promise.all([

    supabase
      .from('admissions')
      .select('*')
      .eq('id', admissionId)
      .single(),

supabase
  .from('op_consultations')
  .select('*')
.eq(
  'patient_id',
  patientId
),

supabase
  .from('medication_orders')
  .select('*')
  .eq(
    'admission_id',
    admissionId
  ),

supabase
  .from('nursing_notes')
  .select('*')
  .eq(
    'admission_id',
    admissionId
  ),

supabase
  .from('discharge_summaries')
  .select('*')
  .eq(
    'admission_id',
    admissionId
  )
  .limit(1),

supabase
  .from('lab_orders')
  .select(`
    *,
    lab_order_items(
      *,
      lab_test_master(
        test_name,
        test_code
      )
    )
  `)
  .eq(
    'admission_id',
    admissionId
  ),

supabase
  .from('radiology_orders')
  .select(`
    *,
    radiology_order_items(
      *,
      radiology_procedure_master(
        procedure_name,
        procedure_code
      )
    )
  `)
  .eq(
    'admission_id',
    admissionId
  ),

  ]);

  const events: any[] = [];

if (admission.data) {

  events.push({

    id:
      admission.data.id,

    type:
      'ADMISSION',

    title:
      '🟢 Patient Admitted',

eventTime:
  admission.data.admission_date,

    data:
      admission.data,

  });

}

(consultations.data || [])
  .forEach((consultation: any) => {

    events.push({

      id:
        consultation.id,

      type:
        'CONSULTATION',

      title:
        `🩺 Consultation Completed${
          consultation.diagnosis
            ? ` - ${consultation.diagnosis}`
            : ''
        }`,

      eventTime:
        consultation.created_at,

      data:
        consultation,

    });

  });

(medicationOrders.data || [])
  .forEach((medication: any) => {

    events.push({

      id:
        medication.id,

      type:
        'MEDICATION_ORDER',

      title:
        `💊 ${medication.medication_name} ${medication.dose}`,

      eventTime:
        medication.ordered_at,

      data:
        medication,

    });

  });

(nursingNotes.data || [])
  .forEach((note: any) => {

    events.push({

      id:
        note.id,

      type:
        'NURSING_NOTE',

title:
  `📝 ${
    note.note_text?.length > 60
      ? note.note_text.substring(0, 60) + '...'
      : note.note_text
  }`,

      eventTime:
        note.created_at,

      data:
        note,

    });

  });

if (
  dischargeSummary.data &&
  dischargeSummary.data.length > 0
) {

  const summary =
    dischargeSummary.data[0];

  events.push({

    id:
      summary.id,

    type:
      'DISCHARGE',

    title:
      '🚪 Patient Discharged',

    eventTime:
      summary.discharged_at,

    data:
      summary,

  });

}

(labOrders.data || [])
  .forEach((order: any) => {

      events.push({

        id:
          order.id,

        type:
          'LAB_ORDER',

title:
  `🧪 ${
    order.lab_order_items?.[0]
      ?.lab_test_master
      ?.test_name ??
    'Laboratory Investigation'
  } Ordered`,

        eventTime:
          order.ordered_at,

        data:
          order,

      });

    });

  (radiologyOrders.data || [])
    .forEach((order: any) => {

      events.push({

        id:
          order.id,

        type:
          'RADIOLOGY_ORDER',

title:
  `🩻 ${
    order.radiology_order_items?.[0]
      ?.radiology_procedure_master
      ?.procedure_name ??
    'Radiology Investigation'
  } Ordered`,

        eventTime:
          order.ordered_at,

        data:
          order,

      });

    });

events.sort(

  (a, b) =>

    new Date(
      a.eventTime
    ).getTime()

    -

    new Date(
      b.eventTime
    ).getTime()

);

  return events;

}