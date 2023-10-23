local Core = exports['qbx-core']:GetCoreObject()
local identifier = "PDM"

CreateThread(function ()
    while GetResourceState("lb-phone") ~= "started" do
        Wait(500)
    end

    local function AddApp()
        local added, errorMessage = exports["lb-phone"]:AddCustomApp({
            identifier = identifier,
            name = "PDM",
            description = "Premium Deluxe Motorsports Catalogue",
            developer = "MT Scripts",
            defaultApp = false,
            size = 59812,
            ui = GetCurrentResourceName() .. "/ui/index.html",
            icon = "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/assets/icon.png"
        })

        if not added then
            print("Could not add app:", errorMessage)
        end
    end

    AddApp()

    AddEventHandler("onResourceStart", function(resource)
        if resource == "lb-phone" then
            AddApp()
        end
    end)

    SendNuiMessage({
        vehicles = json.encode(Core.Shared.Vehicles)
    })
end)

RegisterNUICallback('getVehicles', function(data, cb)
    cb({ vehicles = json.encode(Core.Shared.Vehicles), categories = json.encode(Config.vehicleCategories) })
end)
