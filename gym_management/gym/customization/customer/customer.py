import frappe
from frappe.model.mapper import get_mapped_doc
@frappe.whitelist()
def make_subscription(source_name, target_doc=None):
    def postprocess(source, target):
        target.party_type = "Customer",
        target.party = source.customer_name
        target.custom_email = source.email_id
        
        target.set("plans", [])
        if source.custom_interested_plan:
            row = target.append("plans", {})
            row.plan = source.custom_interested_plan
            row.qty = 1
    doc = get_mapped_doc(
        "Customer",
        source_name,
        {
            "Customer": {
                "doctype" : "Subscription",
                "field_map": {
                    "customer_primary_contact": "customer_primary_contact"
                },
            },
        },
        target_doc,
        postprocess=postprocess
    )
    # frappe.throw(str(doc.as_dict()))
    return doc

@frappe.whitelist()
def has_paid_invoice(customer):
    return frappe.db.exists(
        "Sales Invoice",
        {
            "customer": customer,
            "status": "Paid"
        }
    )

# fitness buttion  customer par 
@frappe.whitelist()
def make_fitness_profile(source_name, target_doc=None):
    doc = get_mapped_doc(
        "Customer",
        source_name,
        {
            "Customer": {
                "doctype": "Fitness Profile",
                "field_map": {
                    "customer_name": "customer",
                    "custom_active_subscription": "subscription",
                    "custom_join_date" : "subscription_start_date",
                    "custom_assigned_trainer" : "trainer"
                    
                }
            }
        },
        target_doc
    )
    return doc

import frappe
@frappe.whitelist()
def make_employee(first_name,gender,date_of_birth,date_of_joining,status, user):
    existing_employee = frappe.db.exists("Employee",{"user_id":user})
    if existing_employee:
        return
    else:
        doc = frappe.new_doc("Employee")
        doc.first_name = first_name
        doc.gender = gender
        doc.date_of_birth = date_of_birth
        doc.date_of_joining = date_of_joining
        # doc.status = status
        doc.user_id = user
        doc.insert()




    


