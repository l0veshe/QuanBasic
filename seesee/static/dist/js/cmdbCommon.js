function openSelect2(name, tagsTrue) {
    var selectEle = $(editor.dom["form"]).find("div.DTE_Field.DTE_Field_Name_" + name).find("select")
    var backSe2
    if (tagsTrue == true){
        backSe2 = selectEle.select2({
            dropdownParent: $('.modal'),
            tags: true,
            tokenSeparators: [',', ' '],
            placeholder: {
                text: 'Select an option'
            },

        })
    }else{
        backSe2 = selectEle.select2({
            dropdownParent: $('.modal'),
        })
    }

    $(".select2").width("100%")
    return backSe2

}

/**
 *
 * @param name
 */
function destroySelect2(name) {
    var selectEle = $(editor.dom["form"]).find("div.DTE_Field.DTE_Field_Name_" + name).find("select")
    selectEle.select2("destroy")
}


function taskAllHour(dataTable){
    var consumHours = dataTable.column( 5 ,{"filter": "applied"} ).data().sum()
    $(".consumHoursSum").html("共 " + consumHours +  " 小时")


}


jQuery.fn.dataTable.Api.register( 'sum()', function () {
    try {
        return this.flatten().reduce(function (a, b) {
            return (a * 1) + (b * 1); // cast values in-case they are strings
        });
    }catch (err){
        return 0
    }
});


function rack2areaJson(rackJson) {
    var areaArr = Array()
    $.each(rackJson.Rs, function(i,v){
        if (areaArr[v.IDC.Area.ArName] == undefined){
            areaArr[v.IDC.Area.ArName] = Array()
            areaArr[v.IDC.Area.ArName]["id"] = v.IDC.Area.ArID
            if (areaArr[v.IDC.Area.ArName]["idc"] == undefined){
                areaArr[v.IDC.Area.ArName]["idc"] = Array()
                areaArr[v.IDC.Area.ArName]["idc"][v.IDC.IdcName] =  Array()
                areaArr[v.IDC.Area.ArName]["idc"][v.IDC.IdcName]["id"] = areaArr[v.IDC.Area.ArName]["idc"]["IdcID"]
                if(areaArr[v.IDC.Area.ArName]["idc"][v.IDC.IdcName]["rack"] == undefined){
                    areaArr[v.IDC.Area.ArName]["idc"][v.IDC.IdcName]["rack"] = Array()
                    areaArr[v.IDC.Area.ArName]["idc"][v.IDC.IdcName]["rack"][v.RackName] = Array()
                    areaArr[v.IDC.Area.ArName]["idc"][v.IDC.IdcName]["rack"][v.RackName]["id"] = v.RackID
                }
            }
        } else {
            if (areaArr[v.IDC.Area.ArName]["idc"][v.IDC.IdcName] == undefined){
                areaArr[v.IDC.Area.ArName]["idc"][v.IDC.IdcName] =  Array()
                areaArr[v.IDC.Area.ArName]["idc"][v.IDC.IdcName]["id"] = areaArr[v.IDC.Area.ArName]["idc"]["IdcID"]
                if(areaArr[v.IDC.Area.ArName]["idc"][v.IDC.IdcName]["rack"] == undefined){
                    areaArr[v.IDC.Area.ArName]["idc"][v.IDC.IdcName]["rack"] = Array()
                    areaArr[v.IDC.Area.ArName]["idc"][v.IDC.IdcName]["rack"][v.RackName] = Array()
                    areaArr[v.IDC.Area.ArName]["idc"][v.IDC.IdcName]["rack"][v.RackName]["id"] = v.RackID
                }
            }else{
                if(areaArr[v.IDC.Area.ArName]["idc"][v.IDC.IdcName]["rack"][v.RackName] == undefined){
                    areaArr[v.IDC.Area.ArName]["idc"][v.IDC.IdcName]["rack"][v.RackName] = Array()
                    areaArr[v.IDC.Area.ArName]["idc"][v.IDC.IdcName]["rack"][v.RackName]["id"] = v.RackID
                }
            }
        }

    })
    return areaArr
}

function area2areaSelect(areaJson){
    var data = Array()
    var item = 0
    for(var key in areaJson){
        data[item] = {}
        data[item]["id"] = key
        data[item]["text"] = key
        data[item]["value"] = key
        item = item + 1
    }
    return data
}


function idc2idcSelect(areaJson, areaFilterSelected){
    var data = Array()
    var item = 0
    for (var key in areaFilterSelected){
        for(var key2 in areaJson[areaFilterSelected[key]]["idc"]){
            data[item] = {}
            data[item]["id"] = key2
            data[item]["text"] = areaFilterSelected[key] + "-" + key2
            item = item + 1
        }
    }
    return data
}

function rack2rackSelect(areaJson, areaFilterSelected, idcFilterSelected){
    var data = Array()
    var item = 0
    for (var key in areaFilterSelected){
        for(var key2 in idcFilterSelected){
            for(var key3 in areaJson[areaFilterSelected[key]]["idc"][idcFilterSelected[key2]]["rack"]){
                data[item] = {}
                data[item]["id"] = areaFilterSelected[key]  + "-" + idcFilterSelected[key2] + "-" + key3
                data[item]["text"] = areaFilterSelected[key]  + "-" + idcFilterSelected[key2] + "-" + key3
                item = item + 1

            }
        }
    }
    return data
}