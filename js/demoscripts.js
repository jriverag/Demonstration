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
        var rowid = "oddrow";
        for(count = 0; count < result.GetAllCustomersResult.length; count ++)
        {
            if (count%2 == 0)
            {
                rowid = "evenrow";
            }
            else
            {
                rowid = "oddrow";
            }
            display += "<tr id=" + rowid + "><td>" + result.GetAllCustomersResult[count].City + "</td><td>" + result.GetAllCustomersResult[count].CompanyName + "</td><td>" + result.GetAllCustomersResult[count].CustomerID + "</td></tr>";
        }
        display += "</table>";
        document.getElementById("listcustomers").innerHTML = display;
        }
}
        
function CreateCustomer()
{
    var objajax = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    //customer data from web page
    var customerid = document.getElementById("custid").value;
    var customername = document.getElementById("custname").value;
    var customercity = document.getElementById("custcity").value;
    var objdisplay = document.getElementById("result");
    //Create parameter string
    var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername + '","City":"' + customercity + '"}';
    
    //Checking for AJAX operation return
    objajax.onreadystatechange = function()
    {
        if (objajax.readyState == 4 && objajax.status == 200)
        {
            var result = JSON.parse(objajax.responseText);
            var outcome = result.WasSuccessful
            var error = result.Exception;
            OperationResult(outcome, error, objdisplay);
        }
    }
    //Start AJAX operation
    objajax.open("POST", url, true);
    objajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objajax.send(newcustomer);
}

function OperationResult(success, exception, displayObject)
{
    if (success == 1)
    {
        displayObject.innerHTML = "The operation was successful!";
    }
    else
    {
        displayObject.innerHTML = "The operation was not successful:<br>" + exception;
    }
}

function DeleteCustomer()
       {
            var xmlhttp = new XMLHttpRequest();
            var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
            url += document.getElementById("deleteid").value;
            var objdisplay = document.getElementById("deleteresult");
                        
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var output = JSON.parse(xmlhttp.responseText);
                    var outcome = output.DeleteCustomerResult.WasSuccessful
                    var error = output.DeleteCustomerResult.Exception;
                    OperationResult(outcome, error, objdisplay);
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }