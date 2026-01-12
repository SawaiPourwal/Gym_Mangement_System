import frappe

def cleanup():
    # List of DocTypes to delete (Reverse order of dependencies)
    doctypes = [
        "Gym Diet Meal", "Gym Diet Plan", "Gym Food Item",
        "Gym Workout Plan Item", "Gym Workout Plan", "Gym Exercise",
        "Gym Membership", "Gym Subscription Plan", "Gym Member"
    ]

    for dt in doctypes:
        if frappe.db.exists("DocType", dt):
            frappe.delete_doc("DocType", dt, force=1)
            print(f"Deleted DocType: {dt}")

    # List of Roles to delete
    roles = ["Gym Trainer", "Gym Receptionist", "Gym Member"]
    for role in roles:
        if frappe.db.exists("Role", role):
            frappe.delete_doc("Role", role, force=1)
            print(f"Deleted Role: {role}")
            
    # List of Workflows to delete
    workflows = ["Gym Membership Workflow", "Gym Workout Plan Workflow", "Gym Diet Plan Workflow"]
    for wf in workflows:
        if frappe.db.exists("Workflow", wf):
            frappe.delete_doc("Workflow", wf, force=1)
            print(f"Deleted Workflow: {wf}")

    frappe.db.commit()
    print("Cleanup Complete")
