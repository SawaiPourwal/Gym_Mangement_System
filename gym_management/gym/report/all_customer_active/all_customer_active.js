// Copyright (c) 2025, sawai kumawat and contributors
// For license information, please see license.txt

frappe.query_reports["All Customer Active"] = {
	filters: [
		{
			fieldname: "status",
			label: "Status",
			fieldtype: "Select",
			options: "\nActive\nCompleted\nUnpaid\nAll",
			default: "Active"
		},
		{
			fieldname: "party",
			label: "Party",
			fieldtype: "Link",
			options: "Customer",
		},
		{
			fieldname: "plan",
			label: "Plan",
			fieldtype: "Link",
			options: "Subscription Plan"

		}
	]
};
