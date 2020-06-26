/**
 * @author wookim
 * @since 2020.06.24
 * @see go 다이어그램 template view 예제
 * 
 */
document.addEventListener("DOMContentLoaded", function(){
    // go 그래프 오브젝트 생성
    // go 그래프 오브젝트와 html div id 매핑 
    // go 그래프 view template 설정 
    //     내부적으로 view와 model의 매핑 정의 
    // model 생성
    // model 데이터 삽입
    // diagram에 model 매핑

    var diagramTitleHeight = 25;
    // go 그래프 오브젝트 생성 : 객체 생성
    var $ = go.GraphObject.make;
    // go 그래프 오브젝트의 다이어그램과 html div id 매핑 : 그릴곳 지정 - 캔버스
    myDiagram = $(go.Diagram, "myDiagramDiv");
    // go 그래프 view template 설정 : 그림 그릴 계획 설정 - 화가의 그림 스타일 선택
    myDiagram.nodeTemplate = 
        $(go.Node, "Vertical",
            {
                // 노드 그림자 옵션
                isShadowed: true,
                shadowColor: "black",
                shadowOffset: new go.Point(1,1)
            },
            $(go.Panel, "Vertical",
                $(go.Panel, "Auto",
                    $(go.Shape, "RoundedRectangle",
                        // 노드 테두리 색 지정
                        new go.Binding("stroke", "color",
                            function(color){
                                return color[0];
                            }
                        ),
                        // 노드 색 지정
                        new go.Binding("fill", "color",
                            function(color){
                                // 색상 그레디언트 설정
                                var gradBrush =  $(go.Brush, "Linear",
                                    {
                                        0: color[0],
                                        0.9: color[1],
                                        start: go.Spot.Left,
                                        end: go.Spot.Right
                                    }
                                );
                                return gradBrush;
                            }
                    )),
                    // 노트의 텍스트 설정
                    $(go.TextBlock, "Default Text", {
                        margin: 12, font: "bold 20px sans-serif" },
                        // 모델 key를 node의 text로 설정
                        new go.Binding("text", "key"),
                        // 모델의 color를 node의 글 색(stroke)로 설정
                        new go.Binding("stroke", "color",
                            function(color){
                                return "#FEF9EF";
                            }
                        )
                    )
                )
            )
        );
    // 그룹 다이어그램 설정
    myDiagram.groupTemplate =
        $(go.Group,
            {
                // 그룹 다이어그램 그림자 설정
                isShadowed: true,
                shadowColor: "Black",
                shadowOffset: new go.Point(2,2)
            },
            // 최상위 판넬
            $(go.Panel, "Auto",
                $(go.Shape,
                    {
                        fill: "white",
                        strokeWidth: 0.5,
                        shadowVisible: true
                    },
                    new go.Binding("stroke", "color",
                        function(color){
                            return color[0];
                        }
                    ),
                ),
                // 시스템 이름 pnael
                $(go.Panel, "Vertical",
                    {
                        // 위 판넬 크기에 맞게 좌우로 stretch
                        defaultStretch: go.GraphObject.Horizontal
                    },
                    $(go.Panel,
                        {
                            // 위 판넬 크기에 맞게 좌우로 stretch
                            defaultStretch: go.GraphObject.Horizontal
                        },
                        $(go.Shape,
                            {
                                height: 30
                            },
                            // 판넬 테두리 설정
                            new go.Binding("stroke", "color",
                                function(color){
                                    return color[0];
                                }
                            ),
                            // 판낼 색상 설정
                            new go.Binding("fill", "color",
                                function(color){
                                    var gradBrush = $(go.Brush, "Linear",
                                        {
                                            0: color[0],
                                            0.9: color[1],
                                            start: go.Spot.Left,
                                            end: go.Spot.Right
                                        }
                                    )
                                    return gradBrush;
                                }),
                        ),
                        // 판낼 시스템 이름 설정
                        $(go.TextBlock,
                            {
                                font: "bold 20px sans-serif",
                                margin: 3,
                                textAlign: "left",
                            },
                            // 데이터와 매핑
                            new go.Binding("text", "key"),
                            new go.Binding("stroke", "color",
                                // 
                                function(color){
                                    return go.Brush.isDark(color[0]) ? "white" : go.Brush.darkenBy(color[0], .8);
                                }
                            )
                        ),
                    ),
                    $(go.Placeholder,
                        { padding: 50}),
                )
            )
        );
    // 선 설정
    myDiagram.linkTemplate =
    $(go.Link, {
            // 다이어그램 피하는 옵션
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpGap },
        $(go.Shape, { strokeWidth: 2 }),
        $(go.Shape, { toArrow: "OpenTriangle" }),
        // 데이터에 isInnerGroupLink 값을 이용해 fromSpot를 설정
        new go.Binding("fromSpot", "isInnerGroupLink", 
            function(isInnerGroupLink){
                if(isInnerGroupLink == "inToGroup"){
                    return  go.Spot.LeftSide;
                }else if(isInnerGroupLink == "outToGroup"){
                    return  go.Spot.RightSide;
                }
            }
        ),
        // 데이터에 isInnerGroupLink 값을 이용해 toSpot를 설정
        new go.Binding("toSpot", "isInnerGroupLink", 
            function(isInnerGroupLink){
                if(isInnerGroupLink == "inToGroup"){
                    return  go.Spot.LeftSide;
                }else if(isInnerGroupLink == "outToGroup"){
                    return  go.Spot.RightSide;
                }
             }
        )
    );

    // 데이터 로드
    var systemModel = LoadSystemModel();
    systemModel = setColorByType(systemModel);

    var flowModel = LoadFlowModel();
    checkInnerConnection(systemModel, flowModel);


    var model = $(go.Model);
    console.log(myDiagram.groupTemplate);
    myDiagram.model = new go.GraphLinksModel(systemModel, flowModel);
    myDiagram.groupTemplate.findSubGraphParts();
});

/**
 * 시스템 타입별 색상 지정 메소드
 * 
 * @author wookim
 * @since 2020.06.25
 * @param model : 다이어그램 데이터
 * 
 */
function setColorByType(model){
    var color1 = "";
    var color2 = "";
    model.forEach(map => {
        switch (map.type){
            case "system":
                color1 = "#227C9D";
                color2 = "#1D6A86";
                break;
            case "platform":
                color1 = "#17C3B2";
                color2 = "#13A496";
                break;
            case "informationSystem":
                color1 = "#FFCB77";
                color2 = "#FFC05C";
                break;
            case "schema":
                color1 = "#FE5D62";
                color2 = "#FE484E";
                break;
            default :
                color1 = "white";
                color2 = "white";
        }
        var colorArr = map.color;
        colorArr[0] = color1;
        colorArr[1] = color2;

        map.color = colorArr;
    });
    return model;
}
/**
 * 내부 그룹 간 연결인지 확인하는 메소드
 * 
 * 
 * @author wookim
 * @since 2020.06.26
 * @param {*} node 
 * @param {*} link 
 */
function checkInnerConnection(node, link){
    // link 배열 순회
    link.forEach(linkRow =>{
        var searchInToGroupKey = linkRow.to;
        var searchOutToGroupKey = linkRow.from;
        var toKey = linkRow.to;
        var fromKey = linkRow.from;
        var isInnerGroupLink = "outToAnotherGroupOrNode";

        // node 배열 순회
        for(var nodeIdx = 0; nodeIdx < node.length; nodeIdx++){
            var nodeRow = node[nodeIdx];
            if(nodeRow.key == searchInToGroupKey && nodeRow.group == fromKey){
                isInnerGroupLink = "inToGroup";
                break;
            }
            else if(nodeRow.key == searchInToGroupKey){
                searchInToGroupKey = nodeRow.group;
            }
            if(nodeRow.key == searchOutToGroupKey && nodeRow.group == toKey){
                isInnerGroupLink = "outToGroup";
                break;
            }else if(nodeRow.key == searchOutToGroupKey){
                searchOutToGroupKey = nodeRow.group;
            }
        }
        linkRow.isInnerGroupLink = isInnerGroupLink;
    })
}