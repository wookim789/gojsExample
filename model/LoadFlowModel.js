/**
 * @author wookim
 * @since 2020.06.24
 * @see go 다이어그램 flow model 예제
 *  */ 

function LoadFlowModel(){
var flowArray = [{
    from: "계1", to: "계2"
},{
    from: "계1", to: "플랫폼1"
},{
    from: "플랫폼1", to: "정보시스템1"
},{
    from: "정보시스템1", to: "스키마1"
},{
    from: "스키마1", to: "정보시스템1"
},{
    from: "정보시스템1", to: "플랫폼1"
},{
    from: "정보시스템1", to: "플랫폼2"
},{
    from: "정보시스템1", to: "정보시스템2"
},{
    from: "정보시스템3", to: "정보시스템2"
},{
    from: "정보시스템2", to: "정보시스템1"
},{
    from : "정보시스템2", to: "플랫폼1"
}];
    return flowArray;
}