frappe.ui.form.on('Customer', {
    refresh: function(frm){
        toggale_subscription_field(frm);
		console.log("Customer JS Loaded");
        // frappe.msgprint("hello");
      
        frm.add_custom_button(__('Subscription' ), function() {
            frappe.model.open_mapped_doc({
                method : "gym_management.gym.customization.customer.customer.make_subscription",
                frm : frm
            
            });
        }, __("Create"));
    
    }
});    
// customer ke under jab subscriotion active ho tabhi show hoti ha
function toggale_subscription_field(frm){
    if (frm.doc.custom_active_subscription){
        frm.set_df_property("custom_active_subscription", "hidden", 0);
        frm.set_df_property("custom_join_date", "hidden", 0);
    }
    else{
        frm.set_df_property("custom_active_subscription", "hidden", 1);
        frm.set_df_property("custom_join_date", "hidden", 1);
    }
}


frappe.ui.form.on('Customer', {
    refresh: function (frm) {

        if (!frm.doc.name) return;

        frappe.call({
            method: "gym_management.gym.customization.customer.customer.has_paid_invoice",
            args: {
                customer: frm.doc.name
            },
            callback: function (r) {
                if (!r.message) return;
                frm.add_custom_button(__('Fitness Profile'), function () {

                    frappe.model.open_mapped_doc({
                        method: "gym_management.gym.customization.customer.customer.make_fitness_profile",
                        frm: frm
                    });

                },__("Create"));

            }
        });
    }
});
frappe.ui.form.on('Customer', {
    refresh(frm){
        if(frm.doc.custom_active_subscription){
            frm.add_custom_button(__("Employee"),  () => {
                open_employee_dialog(frm);
                console.log("::::::::::::::::::::::::")
            
            },__("Create"));
        }

    }
});

function open_employee_dialog(frm){
    let row = frm.doc.portal_users[0];
    let d = new frappe.ui.Dialog({
        title : "Create Employee",
        fields : [
            {
                label : "First Name",
                fieldname : "first_name",
                fieldtype : "Data",
                default: frm.doc.customer_name,
                reqd: 1
            },
            {
                label : "Gender",
                fieldname : "gender",
                fieldtype : "Link",
                default: frm.doc.gender,
                reqd: 1
                
            },
            {
                label : "Date of Birth",
                fieldname : "date_of_birth",
                fieldtype : "Date",
                default: frm.doc.custom_date_of_birth,
                reqd: 1
                
            },
            {
                label : "Date of Joining",
                fieldname : "date_of_joining",
                fieldtype : "Date",
                // default: frm.doc.custom_date_of_birth,
                reqd: 1
                
            },
            {
                label : "Status",
                fieldname : "status",
                fieldtype : "Select",
                options : ["Active","Inactive", "Suspended", "Left"],
                // default: "Active",
                reqd: 1
                    
            },
            {
                label : "User",
                fieldname : "user",
                fieldtype : "Link",
                default: row.user
                // reqd: 1

            }

        ],
        primary_action_label : "Create Employee",
        primary_action(values){ 
            frappe.call({
                method: "gym_management.gym.customization.customer.customer.make_employee",
                args : {
                    first_name : values.first_name,
                    gender : values.gender,
                    date_of_birth : values.date_of_birth,
                    date_of_joining: values.date_of_joining,
                    status : values.status,
                    user : values.user
                },
                
            });
            d.hide();
            
            
        }
    });
    d.show();
}







    
