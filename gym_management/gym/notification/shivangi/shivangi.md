<p>Hello {{doc.party}},</p>

<p>Your gym subscription {{frappe.db.get_value("Subscription Plan Detail",{"parent":doc.name},'plan')}} has been successfully activated.</p>

<p>Start Date: {{doc.start_date}}
End Date: {{doc.end_date}}</p>

<p>Welcome to our gym </p>

<p>Regards,
Gym Team</p>
