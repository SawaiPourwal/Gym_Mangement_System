<p>Hello {{doc.customer}},<br><br></p>

<p>Your gym membership invoice has been generated.<br><br></p>

<p><b>Invoice No:</b> {{ doc.name }}<br>
<b>Amount:</b> ₹{{ doc.grand_total }}<br>
<b>Due Date:</b> {{ doc.due_date }}<br><br></p>

<p>Please complete the payment to activate your membership.<br><br></p>

<p>Regards,<br>
Gym Team</p>
