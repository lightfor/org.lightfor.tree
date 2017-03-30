
function getDataFromTree(id) {
    var areaObj = $.fn.zTree.getZTreeObj(id).getCheckedNodes(true);
    var area = "";
    $(areaObj).each(function (index) {
        area += areaObj[index].code;
        if (areaObj.length !== index + 1) {
            area += ",";
        }
    });
    return area;
}

function loadTree(id, codeType){
    $(".tree-con .ztree-loader").show();
    $.fn.zTree.destroy(id);
    var setting = {
        check: {
            enable: true
        },
        data: {
            key : {
                name : 'codeName'
            },
            simpleData: {
                enable: true,
                idKey: "code",
                pIdKey: "parentCode",
                rootPId: 1
            }
        }
    };

    var url = "listCode.shtml";
    $.post(url,{'codeType' : codeType},function(data){
        $.fn.zTree.init($("#areaTree"), setting, data);
        var treeObj = $.fn.zTree.getZTreeObj(id);
        treeObj.expandAll(false);
        treeObj.setting.check.chkboxType = { "Y" : "ps", "N" : "s" };
        $(".tree-con .ztree-loader").hide();
    });
}

function checkTree(id, value){
    var treeObj = $.fn.zTree.getZTreeObj(id);
    var checkedNodes = treeObj.getCheckedNodes();
    for(var i = 0 , l = checkedNodes.length; i < l ; i++ ){
        treeObj.setChkDisabled(checkedNodes[i], false, true, true);
        treeObj.checkNode(checkedNodes[i], false);
    }
    if(value){
        var nodes = value.split(',');
        for (i=0, l=nodes.length; i < l; i++) {
            var node =  treeObj.getNodeByParam("code", nodes[i], null);
            treeObj.setChkDisabled(checkedNodes[i], false, true, true);
            treeObj.checkNode(node, true, false);
        }
    } else {
        checkedNodes = treeObj.getCheckedNodes(false);
        for(i = 0 , l = checkedNodes.length; i < l ; i++ ){
            treeObj.setChkDisabled(checkedNodes[i], false, true, true);
            treeObj.checkNode(checkedNodes[i], false);
        }
    }
}

function checkAndDisabledTree(id, value){
    var treeObj = $.fn.zTree.getZTreeObj(id);
    var checkedNodes = treeObj.getCheckedNodes();
    var i = 0;
    var l = checkedNodes.length;
    for(; i < l ; i++ ){
        treeObj.setChkDisabled(checkedNodes[i], false, true, true);
        treeObj.checkNode(checkedNodes[i], false, false);
    }
    if(value){
        var nodes = value.split(',');
        for (i=0, l=nodes.length; i < l; i++) {
            var node =  treeObj.getNodeByParam("code", nodes[i], null);
            treeObj.setChkDisabled(node, false, true, true);
            treeObj.checkNode(node, true, false);
            treeObj.setChkDisabled(node, true, true, true);
        }
    } else {
        checkedNodes = treeObj.getCheckedNodes(false);
        for(i = 0 , l = checkedNodes.length; i < l ; i++ ){
            treeObj.checkNode(checkedNodes[i], false);
            treeObj.setChkDisabled(checkedNodes[i], true, true, true);
        }
    }
}