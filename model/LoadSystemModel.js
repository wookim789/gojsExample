/**
 * @author wookim
 * @since 2020.06.24
 * @see go 다이어그램 model 예제
 *  */ 

function LoadSystemModel(){
    var nodeArray = [{
        color: ["", ""], type: "system", key: "계1", isGroup: true
    },{
        color: ["", ""], type: "informationSystem", key: "정보시스템1", isGroup: true, group:"플랫폼1"
    },{
        color: ["", ""], type: "schema", key: "스키마2", group: "정보시스템2"
    },{
        color: ["", ""], type: "platform", key: "플랫폼1", isGroup: true, group: "계1"
    },{
        color: ["", ""], type: "informationSystem", key: "정보시스템2", isGroup: true, group:"플랫폼2"
    },{
        color: ["", ""], type: "platform", key: "플랫폼2", isGroup: true, group: "계1"
    },{
        color: ["", ""], type: "informationSystem", key: "정보시스템3", isGroup: true, group:"플랫폼3"
    },{
        color: ["", ""], type: "schema", key: "스키마1", group: "정보시스템1"
    },{
        color: ["", ""], type: "system", key: "계2", isGroup: true
    },{
        color: ["", ""], type: "platform", key: "플랫폼3", isGroup: true, group: "계2"
    },{
        color: ["", ""], type: "schema", key: "스키마3", group: "정보시스템3"
    }];
    return nodeArray;
}

