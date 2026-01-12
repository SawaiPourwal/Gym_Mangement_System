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


@frappe.whitelist()
def make_sales_invoice(source_name, target_doc=None):
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
                # "table_fieldname": "items",
                "field_map": {
                    "protein_item": "item_code",	
                    "rate": "rate",
                    "qty": "qty"
                }
            }
        },
        target_doc
    )
    return doc
