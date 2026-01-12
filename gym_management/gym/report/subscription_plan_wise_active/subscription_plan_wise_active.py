# Copyright (c) 2025, sawai kumawat and contributors
# For license information, please see license.txt

import frappe
from frappe.query_builder.functions import Count

def execute(filters=None):
    columns = get_columns(filters)
    data = get_data(filters)
    return columns, data

def get_columns(filters):
    columns = [
        {"label": "Subscription Plan", "fieldname": "custom_interested_plan", "fieldtype" : "Link", "options" : "Subscription Plan", "width" : 200},
    
        
	]
    return columns
def get_data(filters):
    customer = frappe.qb.DocType("Customer")
    quary = (
        frappe.qb.from_(customer)
        .select(
            customer.custom_interested_plan
		)
	)
    return quary.run(as_dict= True)

    
