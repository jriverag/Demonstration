function MenuSelect()
{
    document.getElementById("about").style.visibility = "hidden";
    document.getElementById("add").style.visibility = "hidden";
    document.getElementById("change").style.visibility = "hidden";
    document.getElementById("delete").style.visibility = "hidden";
    document.getElementById("list").style.visibility = "hidden";
    
    var selection = document.getElementById("menuitems").value;
    
    switch (selection)
    {
        case "Home":
            
            break;
        case "About":
            document.getElementById("about").style.visibility = "visible";
            break;
        case "Add Data":
            document.getElementById("add").style.visibility = "visible";
            break;
        case "Change Data":
            document.getElementById("change").style.visibility = "visible";
            break;
        case "Delete Data":
            document.getElementById("delete").style.visibility = "visible";
            break;
        case "List Data":
            document.getElementById("list").style.visibility = "visible";
            break;
        default:
            alert("Please select a different menu option");
            
    }
}

function ListCustomers()
        {
            var xmlhttp = new XMLHttpRequest();
            var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
             
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var output = JSON.parse(xmlhttp.responseText);
                    GenerateOutput(output);
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
            
            function GenerateOutput(result)
            {
            var display = "<table><tr><th>City</th><th>Company Name</th><th>Customer ID</th></tr>";
            var count = 0;
            for(count = 0; count < result.GetAllCustomersResult.length; count ++)
            {
                display += "<tr><td>" + result.GetAllCustomersResult[count].City + "</td><td>" + result.GetAllCustomersResult[count].CompanyName + "</td><td>" + result.GetAllCustomersResult[count].CustomerID + "</td></tr>";
            }
            display += "</table>";
            document.getElementById("listcustomers").innerHTML = display;
            }
        }