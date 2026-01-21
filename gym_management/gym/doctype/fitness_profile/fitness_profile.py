import frappe
from frappe.model.document import Document
from frappe.model.mapper import get_mapped_doc


class FitnessProfile(Document):
    def before_save(self):
        for row in self.items:
            if row.rate and row.qty:
                row.amount = row.rate * row.qty
            else:
                row.amount = 0

# protein item ke liye sales invoice function
@frappe.whitelist()
def make_sales_invoice(source_name, target_doc=None):

    def postprocess(source, target):
        for i, row in enumerate(source.items):
            if not row.item_code:
                continue
            item_doc = frappe.get_doc("Item", row.item_code)
            target_row = target.items[i]
            target_row.uom = item_doc.stock_uom


    doc = get_mapped_doc(
        "Fitness Profile",
        source_name,
        {
            "Fitness Profile": {
                "doctype": "Sales Invoice",
                "field_map": {
                    "customer": "customer"
                }
            },
            "Protein Item": {
                "doctype": "Sales Invoice Item",
                "field_map": {
                    "item_code": "item_code",	
                    "rate": "rate",
                    "qty": "qty",
                    "income_account" : "income_account"
                    
                    
                }
            }
        },
        target_doc,
        postprocess=postprocess
    )
    return doc
