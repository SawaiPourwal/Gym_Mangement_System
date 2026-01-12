import frappe
@frappe.whitelist()
def set_subscription_details(subscription, stratdate):

    if not subscription:
        return
    sub_doc = frappe.get_doc("Subscription", subscription)
    if not sub_doc.party:
        return
    frappe.db.set_value("Customer", sub_doc.party,{
        "custom_active_subscription" : subscription,
        "custom_join_date" : stratdate,
        # "custom__subscription_end_date": enddate,
        "custom_trainer_assigned_date" : stratdate
        
    })


from frappe.utils import add_days, add_months, add_years

@frappe.whitelist()
def get_plan_end_date(start_date, subscription_plan):

    sub_plan = frappe.get_doc("Subscription Plan", subscription_plan)
    # frappe.throw(str(sub_plan.as_dict()))
    item = frappe.get_doc("Item", sub_plan.item)
    # frappe.throw(str(item.as_dict()))

    duration = item.custom_duration
    duration_type = item.custom_duration_type

    if duration_type == "Day":
        return add_days(start_date, duration - 1)

    elif duration_type == "Month":
        end_date = add_months(start_date, duration)
        return add_days(end_date, -1)

    elif duration_type == "Year":
        end_date = add_years(start_date, duration)
        return add_days(end_date, -1)
    
# plan histry ke under append customer ka last plan 
@frappe.whitelist()
def on_update(doc, method):
    # frappe.throw('hook called')
    if doc.status != "Completed":
        return
    
        
    # frappe.throw(f"status  {doc.status}")
    customer = frappe.get_doc("Customer", doc.party)
    for row in doc.plans:
        plan_doc = frappe.get_doc("Subscription Plan", row.plan)
    for row in customer.custom_plan_histroy:
        # frappe.throw(f"Checking plan {row.subscription} ")
        if row.subscription == doc.name:
            # frappe.throw("Subscription already exists in customer's plan history.")
            return
        else:
            # frappe.throw(f"Subscription {doc.name} already exists in customer's plan history.")
            customer.append("custom_plan_histroy", {
                "subscription" : doc.name,
                

                "last_plan" : doc.plans,
                "start_date" : doc.start_date,
                "end_date" : doc.end_date,
                "plan_amount" : plan_doc.cost
                

            }).save(ignore_permissions=True) 
            frappe.msgprint(f"Subscription {doc.name} added to customer's plan history.")

    

# jab kisi customer ka subscription plan active ho tabhi employee create hona chiye 
@frappe.whitelist()
def make_employee(subscription_name):
    doc = frappe.get_doc("Subscription", subscription_name)
    if doc.status == "Active":
        employee = frappe.get_doc({
            "doctype" : "Employee",
            "first_name" : doc.party,
            # "status" : doc.Active
            

        })
        employee.insert(ignore_permissions=True)
        frappe.throw("document crette")
    
   

        
    