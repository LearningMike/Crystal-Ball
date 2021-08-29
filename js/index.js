var sim = document.getElementById("sim");
let sims = 0;
//NOTE: Here, users mean payers (aka users who made transactions);
function simulate() {
    //document.getElementById("loader").style.cursor = "progress";
    sims = sims + 1; 
    document.getElementById("simcount").innerText = sims;
    var mau = document.getElementById("mau");//monthly active users
    var cps = document.getElementById("cps");//cost per sms
    var res = document.getElementById("res");//possible result
    var grt = document.getElementById("grt");//growth rate
    var scpu = document.getElementById("scpu");//possible result

    var ttra = document.getElementById("ttra");//total transaction in ₦
    var yfore = document.getElementById("yfore");//revenue prediction for the year in ₦
    var rev = document.getElementById("rev");//revenue in ₦
    var peru = document.getElementById("peru");//average transaction per user in ₦
    var nuse = document.getElementById("nuse");//Number of users
    var grb = document.getElementById("grb");//budget for growth activities ₦
    var ttra2 = document.getElementById("ttra2");//total transaction in $
    var yfore2 = document.getElementById("yfore2");//revenue prediction for the year in $
    var rev2 = document.getElementById("rev2");//revenue in $
    var peru2 = document.getElementById("peru2");//average transaction per user in $
    var nuse2 = document.getElementById("nuse2");//Number of users
    var grb2 = document.getElementById("grb2");//budget for growth activities $

    if (mau.value == ""){
        mau.value = 1;
    }
    if (cps.value == ""){
        cps.value = 4;
    }
    if (grt.value == ""){
        grt.value = 100;
    }

    //Input
    var users = parseInt(mau.value);
    var smscost = parseInt(cps.value);
    var posres = res.value;
    var noftra;
    var losstra;
    var totalamount;
    var revenue;

    transactions(users, smscost, posres, noftra, losstra, totalamount, revenue);
    mau.value = Math.ceil((1+parseFloat((grt.value/100))) * users);
}

function transactions(users, smscost, posres, noftra, losstra, totalamount, revenue){
    //money numbers are in kobo (amount = userpay*100)
    var freq;
    var amt;
    switch (posres) {
        case "sad":
            freq = 2;
            amt = 50000;
            break;

        case "conservative":
            freq = 4;
            amt = 100000;
            break;

        case "confident":
            freq = 4;
            amt = 200000;
            break;
        
        case "lucky":
            freq = 8;
            amt = 200000;
            break;
    
        default:
            break;
    }
    noftra = 0;
    losstra = 0;
    totalamount = 0;
    revenue = 0;

    for (let i = 0; i < users; i++){
        //loop through each user
        var usertra = Math.ceil(Math.random()*freq);
        for (let j = 0; j < usertra; j++){
            //loop through each user transactions
            noftra = noftra + 1;
            var amount = Math.ceil(Math.random()*amt);
            //USE THIS LOGIC FOR THE APP, Treat the monies separately
            if (amount < 10000){
                amount = 10000;
                brinmocuscut = 0;
                brinmobizcut = Math.ceil(((amount/100)*4));
                //take revenue
                var brinmotake = brinmobizcut + brinmocuscut;
                var paystackcut = Math.ceil((amount/100)*1.5);
                if ((brinmotake - paystackcut) < 100 ){
                    //if we lose money on a transaction
                    losstra = losstra + 1;
                    alert("Should Never Happen !!!");
                    console.log("amount:" + amount/100 + " brinmotake:" + brinmotake/100 + " paystackcut:" + paystackcut/100);
                }
                revenue = revenue + (brinmotake - paystackcut);
            } else if (amount < 230000){
                brinmocuscut = 0;
                brinmobizcut = Math.ceil(((amount/100)*4));
                //take revenue
                var brinmotake = brinmobizcut + brinmocuscut;
                var paystackcut = Math.ceil((amount/100)*1.5);
                if ((brinmotake - paystackcut) < 100 ){
                    //if we lose money on a transaction
                    losstra = losstra + 1;
                    alert("Should Never Happen !!!");
                    console.log("amount:" + amount/100 + " brinmotake:" + brinmotake/100 + " paystackcut:" + paystackcut/100);
                }
                revenue = revenue + (brinmotake - paystackcut);
            } else if (amount >= 230000){
                var bizamount = amount;//old amount, amount business think they have been paid
                var brinmocuscut = 5000;
                var brinmobizcut = Math.ceil(((amount/100)*4));
                amount = amount + brinmocuscut;
                if (amount >= 250000){
                    //take revenue
                    var brinmotake = brinmobizcut + brinmocuscut;
                    var paystackcut = Math.ceil(((amount/100)*1.5)+10000);
                    if ((brinmotake - paystackcut) < 100){
                        //if we lose money on a transaction
                        losstra = losstra + 1;
                        alert("Should Never Happen !!!");
                        console.log("amount:" + amount/100 + " brinmotake:" + brinmotake/100 + " paystackcut:" + paystackcut/100);
                    }
                    revenue = revenue + (brinmotake - paystackcut);
                } else {
                    //take revenue
                    var brinmotake = brinmobizcut + brinmocuscut;
                    var paystackcut = Math.ceil((amount/100)*1.5);
                    if ((brinmotake - paystackcut) < 100){
                        //if we lose money on a transaction
                        losstra = losstra + 1;
                        alert("Should Never Happen !!!");
                        console.log("amount:" + amount/100 + " brinmotake:" + brinmotake/100 + " paystackcut:" + paystackcut/100);
                    }
                    revenue = revenue + (brinmotake - paystackcut);
                }
            }
            totalamount = totalamount + amount;
        }
    }
    if (((revenue/100) - (smscost*noftra)) >= 1 ){
        document.getElementById("infobox").style.boxShadow = "#00CC0011 0px 0px 10px 400px";
    } else {
        document.getElementById("infobox").style.boxShadow = "#FF000066 0px 0px 10px 400px";
        console.log("!!!LOSS!!!");
        //Loss on SMS
    }
    if ((revenue/100) < 2){
        //Loss on transaction
        //This should be impossible because we need ₦2 to pay for SMS
        alert("Money left to pay for SMS: ₦"+ revenue/100);
    }

    var revenueText = getShort((revenue/100)-(smscost*noftra));
    var totalText = getShort((totalamount/100));
    var averageText = getShort((totalamount/100)/noftra);
    var forecastText = getShort(((revenue/100) - (smscost*noftra))*12);
    var usersText = getShort(users);
    var budgetText = getShort(((revenue/100) - (smscost*noftra)) - (8 * users));

    var revenueText2 = getShort((((revenue/100)-(smscost*noftra))/400));
    var totalText2 = getShort(((totalamount/100))/400);
    var averageText2 = getShort(((totalamount/100)/noftra)/400);
    var forecastText2 = getShort((((revenue/100) - (smscost*noftra))*12)/400);
    var usersText2 = getShort(users);
    var budgetText2 = getShort((((revenue/100) - (smscost*noftra))/400) - (0.05 * users));

    //to increase people(growth) budget save less and less data, aim for average user server cost to be less than $0.001 per user per month

    rev.innerText = "₦"+revenueText;
    ttra.innerText = "₦"+totalText;
    peru.innerText = "₦"+averageText;
    yfore.innerText = "₦"+forecastText;
    nuse.innerText = usersText;
    grb.innerText = "₦"+budgetText;

    rev2.innerText = "$"+revenueText2;
    ttra2.innerText = "$"+totalText2;
    peru2.innerText = "$"+averageText2;
    yfore2.innerText = "$"+forecastText2;
    nuse2.innerText = usersText2;
    grb2.innerText = "$"+budgetText2;
}

function getShort(num) {
    if (num < (0-1000000000000)){
        return Math.trunc(num/1000000000)+"tr";
    } else if (num < (0-1000000000)){
        return Math.trunc(num/1000000000)+"b";
    } else if (num < (0-1000000)){
        return Math.trunc(num/1000000)+"m";
    } else if ( num < (0-1000)){
        return Math.trunc(num/1000)+"k";
    } else if (num < 0){
        return Math.trunc(num);
    }else if (num < 1000){
        return Math.trunc(num);
    } else if ( num < 1000000){
        return Math.trunc(num/1000)+"k";
    } else if (num < 1000000000){
        return Math.trunc(num/1000000)+"m";
    } else if (num < 1000000000000){
        return Math.trunc(num/1000000000)+"b";
    } else if (num < 1000000000000000){
        return Math.trunc(num/1000000000)+"tr";
    }
}

document.addEventListener("keydown", function(e) {
    if (e.keyCode == 13){
        simulate();
    }
}, false);