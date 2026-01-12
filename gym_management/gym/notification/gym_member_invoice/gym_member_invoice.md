Hello {{ doc.party }},<br><br>

Your gym membership invoice has been generated.<br><br>

<b>Invoice No:</b> {{ doc.name }}<br>
<b>Amount:</b> ₹{{ doc.grand_total }}<br>
<b>Due Date:</b> {{ doc.due_date }}<br><br>

Please complete the payment to activate your membership.<br><br>

Regards,<br>
Gym Team
