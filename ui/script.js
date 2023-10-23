let newInner = ''

window.addEventListener("load", () => {
    $.post('https://mt-dealershipapp/getVehicles', JSON.stringify({}), function(data) {
        const vehicles = JSON.parse(data.vehicles)
        const categories = JSON.parse(data.categories)
        
        if(newInner == '') {
            for(let i in vehicles) {
                for(let j in categories) {
                    if(categories[j].id == vehicles[i].category) {
                        let inner = `
                            <div id="vehicle-card-${vehicles[i].model}-${vehicles[i].category}" class="vehicle-card"> 
                                <img src="https://cfx-nui-mt-dealership/web/images/vehicles/${vehicles[i].model}.png" onerror="this.src='assets/alt.png'"> 
                                <div class="vehicleInfo"> 
                                    <div class="vehicle-label">${vehicles[i].name} - ${vehicles[i].class}</div> 
                                    <div class="vehicle-price">${vehicles[i].price.toLocaleString('en')}$</div> 
                                </div> 
                            </div>
                        `
                        newInner += inner
                    }
                }
            }
            $("#cars-wrapper").append(newInner);
            newInner = `<div id="all" class="category">Todos</div>`
            for(let i in categories) {
                let inner = `
                    <br><div id="${categories[i].id}" class="category">${categories[i].label}</div>
                `
                newInner += inner
            }
            $(".categories-wrapper").append(newInner);
        }

        for(let i in categories) {
            document.getElementById(categories[i].id).addEventListener("click", function() {
                var categoryClass = document.getElementsByClassName("vehicle-card")

                for(let a in categoryClass) {
                    if(categoryClass.item(a).id.toLowerCase().indexOf(categories[i].id) > -1) {
                        $("#"+categoryClass.item(a).id).css('display', '');
                    } else {
                        $("#"+categoryClass.item(a).id).css('display', 'none');
                    }
                }
            })
        }

        document.getElementById('all').addEventListener("click", function() {
            var categoryClass = document.getElementsByClassName("vehicle-card")

            for(let a in categoryClass) {
                $("#"+categoryClass.item(a).id).css('display', '');
            }
        })

        document.getElementById("search").addEventListener("input", e => {
            const value = e.target.value.toLowerCase()

            for(let i in vehicles) {
                if (vehicles[i].name.toLowerCase().indexOf(value) > -1) {
                    $('#vehicle-card-'+vehicles[i].model+'-'+vehicles[i].category).css('display', '');
                } else {
                    $('#vehicle-card-'+vehicles[i].model+'-'+vehicles[i].category).css('display', 'none');
                }
            }
        })

        document.getElementById('list-button').addEventListener("click", function() {
            if(document.getElementById('categories-wrapper').style.display == 'none') {
                document.getElementById('categories-wrapper').style.display = 'block'
            } else {
                document.getElementById('categories-wrapper').style.display = 'none'
            }
        })
    });
});