# Copyright (c) 2025, sawai kumawat and contributors
# For license information, please see license.txt

import frappe
from frappe.query_builder.functions import Count

def execute(filters=None):
    columns = get_columns(filters)
    data = get_data(filters)
    return columns, data

    
def get_columns(filters):
    coulmns = [
        {"label": "Party", "fieldname": "party", "fieldtype": "Dynamic Link", "options": "party_type", "width": 200},
        {"label": "Subscription Start Date", "fieldname": "start_date", "fieldtype": "date", "width": 200},
        {"label": "Subscription End Date", "fieldname": "end_date", "fieldtype": "date", "width": 200},
        {"label": "Plan", "fieldname": "plan", "fieldtype": "Link", "options": "Subscription Plan", "width": 200},
        {"label": "Status", "fieldname": "status", "fieldtype": "Data", "width": 150},
        
    ]
    return coulmns

def get_data(filters):
    subscription = frappe.qb.DocType("Subscription")
    # frappe.throw("call subscription")
    plan = frappe.qb.DocType("Subscription Plan Detail")
    # frappe.throw('call childtable')
    query = (
        frappe.qb.from_(subscription)
        .join(plan)
        .on(plan.parent == subscription.name)
        .select(
            subscription.party,
            subscription.start_date,
            subscription.end_date,
            plan.plan,
            subscription.status,
    )   )
    # ).run(as_dict=True)
    # frappe.throw(str(query))
    if filters.get("status"):
        
        query = query.where(subscription.status == filters.get("status"))

        # query = query.where(subscription.party == filters.get("customer"))
    
    if filters.get("party"):
        # frappe.throw(f"{filters.get('party')} ::::::::: {subscription.customer} ")
        query = query.where(subscription.party == filters.get("party"))
    if filters.get("plan"):
        query = query.where(plan.plan == filters.get("plan"))
    return query.run(as_dict=True)
    
