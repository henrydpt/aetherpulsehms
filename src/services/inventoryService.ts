import { supabase } from '../lib/supabase';

export async function getInventory() {
  const { data, error } = await supabase
    .from('pharmacy_inventory')
    .select(`
      id,
      batch_no,
      expiry_date,
      quantity,
      purchase_price,
      selling_price,
      medicines (
        name,
        strength,
        dosage_form,
        manufacturer
      )
    `)
    .order(
      'created_at',
      {
        ascending: false,
      }
    );

  if (error) {
    console.error('Inventory Service Error:', error);
    throw error;
  }

   return data || [];
}

export async function addInventory(
  medicineId: string,
  batchNo: string,
  expiryDate: string,
  quantity: number,
  purchasePrice: number,
  sellingPrice: number
) {
  const { error } = await supabase
    .from('pharmacy_inventory')
    .insert({
      medicine_id: medicineId,
      batch_no: batchNo,
      expiry_date: expiryDate,
      quantity: quantity,
      purchase_price: purchasePrice,
      selling_price: sellingPrice,
    });

  if (error) {
    throw error;
  }
}
export async function reduceInventory(
  inventoryId: string,
  quantity: number
) {

  const { data, error } =
    await supabase
      .from('pharmacy_inventory')
      .select('quantity')
      .eq('id', inventoryId)
      .single();

  if (error) {
    throw error;
  }

  const remaining =
    data.quantity - quantity;

  const { error: updateError } =
    await supabase
      .from('pharmacy_inventory')
      .update({
        quantity: remaining,
      })
      .eq(
        'id',
        inventoryId
      );

  if (updateError) {
    throw updateError;
  }

}