# import frappe
# @frappe.whitelist()
# def get_customer_fitness_data(cus): 
#     # cus = frappe.db.get_value("Portal User",{"user":user,"parenttype":"Customer"},"parent" )
#     profile = frappe.db.get_value("Fitness Profile", {"customer": cus}, "name")
#     fitness_profile = frappe.get_doc("Fitness Profile", profile)
#     diet_plan = []
#     workout_plan = []
#     for row in fitness_profile.exercises:
#         workout_plan.append({
#             "days" : row.days,
#             "muscle_groups" : row.muscle_groups,
#             "exercise" : row.exercise,
#             "sets" : row.sets,
#             "reps" : row.reps   

#         })
#     # frappe.throw(f"{workout_plan}")    
#     for row in fitness_profile.diet_item:  
#         diet_plan.append({
#             "date" : row.date,
#             "day" : row.day,
#             "meal_type" : row.meal_type,
#             "food_item" : row.food_item,
#             "quantity" : row.quantity,
#             "calories" : row.calories
#         })
#     # frappe.throw(f":::::::::::::::::{diet_plan}::::::")      
#     return workout_plan,diet_plan 

# import frappe

# @frappe.whitelist()
# def get_customer_from_logged_user():
#     user = frappe.session.user
#     customer = frappe.db.get_value("Portal User",{"user": user,"parenttype": "Customer"},"parent")
#     return customer

  
    

  
    


# import frappe
# @frappe.whitelist()
# def get_logged_customer():
#     user = frappe.session.user
#     customer = frappe.db.get_value("Portal User",{"user": user,"parenttype": "Customer"},"parent")
#     return customer
# @frappe.whitelist()
# def get_customer_workout_by_day(customer, day):
#     profile_name = frappe.db.get_value("Fitness Profile",{"customer": customer},"name")
#     if not profile_name:
#         return []
#     profile = frappe.get_doc("Fitness Profile", profile_name)
#     workout_data = []


#     # Fitness Profile → exercises (child table)
#     for row in profile.exercises:
#         if row.days == day and row.exercise:

#             # row.exercise = Exercise Template
#             template = frappe.get_doc("Exercise Template", row.exercise)

#             # Exercise Template → exercises (child table)
#             for item in template.exercise:
#                 workout_data.append({
#                     "day": day,
#                     "template": row.exercise,
#                     "exercise": item.excercise,  # fieldname
#                     "sets": item.sets,
#                     "reps": item.reps
#                 })

#     return workout_data

  
    
import frappe

# ---------------- LOGGED CUSTOMER ----------------
@frappe.whitelist()
def get_logged_customer():
    user = frappe.session.user
    customer = frappe.db.get_value(
        "Portal User",
        {"user": user, "parenttype": "Customer"},
        "parent"
    )
    return customer


# ---------------- WORKOUT + DIET BY DAY ----------------
@frappe.whitelist()
def get_customer_workout_by_day(customer, day):

    profile_name = frappe.db.get_value(
        "Fitness Profile",
        {"customer": customer},
        "name"
    )

    if not profile_name:
        return {"workout": [], "diet": []}

    profile = frappe.get_doc("Fitness Profile", profile_name)

    workout_data = []
    diet_data = []

    # -------- WORKOUT --------
    for row in profile.exercises:
        if row.days == day and row.exercise:

            template = frappe.get_doc("Exercise Template", row.exercise)

            for item in template.exercise:
                workout_data.append({
                    "exercise": item.excercise,
                    "sets": item.sets,
                    "reps": item.reps,
                    "template": template.name
                })

    # -------- DIET --------
    for row in profile.diet_item: 
        if row.day == day:  
            diet_data.append({
                "date" : row.date,
                "day" : row.day,
                "meal_type" : row.meal_type,
                "food_item" : row.food_item,
                "quantity" : row.quantity,
                "calories" : row.calories
        })

    return {"workout": workout_data, "diet": diet_data}



    

    
