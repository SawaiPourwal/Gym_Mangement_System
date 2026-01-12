// Copyright (c) 2025, sawai kumawat and contributors
// For license information, please see license.txt
frappe.ui.form.on("Fitness Profile", {

    // workout_plan_start_date(frm) {
    //     add_dates_in_child_table(frm);
    // },

    custom_workout_plan_end_date(frm) {
        add_dates_in_child_table(frm);
    },
    validate: function(frm){
        console.log(":::::::::::::::::::::::::::::::::::::::::::::::")
        enddate_cannot_be_start_date
    }
    
});

// function add_dates_in_child_table(frm) {
//     frm.clear_table("exercises");

//     let start_date = frappe.datetime.str_to_obj(frm.doc.workout_plan_start_date);
//     let end_date = frappe.datetime.str_to_obj(frm.doc.custom_workout_plan_end_date);


//     const days_list = [
//         "Sunday",
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday"
//     ];

//     while (start_date <= end_date) {

//         let row = frm.add_child("exercises");

//         let date_str = frappe.datetime.obj_to_str(start_date);

//         row.date = date_str;
//         let day_index = start_date.getDay(); 
//         row.days = days_list[day_index];

//         console.log("Added:", row.date, row.days);

//         start_date.setDate(start_date.getDate() + 1);
//     }

//     frm.refresh_field("exercises");
// }

function enddate_cannot_be_start_date(frm){
    if(frm.doc.workout_plan_start_date > frm.doc.custom_workout_plan_end_date){
        frappe.msgprint("cannot be date")
    }
}



frappe.ui.form.on("Protein Item",{
    qty(frm,cdt,cdn){
        console.log("rate changed");
        calculate_protein_item(frm, cdt, cdn);
        // console.log("rate changed");
    }

});
function calculate_protein_item(frm, cdt, cdn){
    // console.log("calculate_protein_item called");
    let row = locals[cdt][cdn];
    if(row.rate && row.qty){
        frappe.model.set_value(cdt, cdn, "amount", row.rate * row.qty)
    }
}

frappe.ui.form.on("Diet Item", {
    date: function(frm,cdt,cdn){
        console.log("date changed");
        let row = locals[cdt][cdn];
        if (row.date){
            let day = frappe.datetime.str_to_obj(row.date)
            .toLocaleDateString('en-US', { weekday: 'long' });
            row.day = day;
            frm.refresh_field("diet_items");

        }

    }
});


frappe.ui.form.on("Fitness Profile",{
    refresh (frm){
        // frm.clear_custom_buttons ();
        if(frm.doc.need_protein == 1){
            frm.add_custom_button("sales invoice", () => {
                console.log("button add")
                frappe.model.open_mapped_doc({
                    method : "gym_management.gym.doctype.fitness_profile.fitness_profile.make_sales_invoice",
                    frm : frm
                });
                
                    
            });
        }    
    }

});



