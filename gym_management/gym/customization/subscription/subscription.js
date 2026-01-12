frappe.ui.form.on('Subscription', {
    refresh: function(frm){
        if(frm.doc.name && frm.doc.start_date){
            frappe.call({
                method : "gym_management.gym.customization.subscription.subscription.set_subscription_details",
                args: {
                    subscription : frm.doc.name,
                    stratdate : frm.doc.start_date,
                    // enddate : frm.doc.end_date,

                }
            });
        }
    }
});

frappe.ui.form.on('Subscription', {
    start_date(frm) {
        calculate_end_date(frm);
    },
    plans_add(frm) {
        calculate_end_date(frm);
    },
    plans_remove(frm) {
        calculate_end_date(frm);
    }
});

function calculate_end_date(frm) {
    if (!frm.doc.start_date || !frm.doc.plans || !frm.doc.plans.length) {
        return;
    }

    let plan = frm.doc.plans[0].plan;
    if (!plan) return;

    frappe.call({
        method: "gym_management.gym.customization.subscription.subscription.get_plan_end_date",
        args: {
            start_date: frm.doc.start_date,
            subscription_plan: plan
        },
        callback: function(r) {
            if (r.message) {
                frm.set_value("end_date", r.message);
            }
        }
    });
}
// frappe.ui.form.on("Subscription",{
//     refresh: function(frm){
//         console.log("::::LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")

//         frappe.call({
//             method: "gym_management.gym.customization.subscription.subscription.make_employee",
//             args: {
//                 subscription_name : frm.doc.name

//             }
//         })
//     } 
// });