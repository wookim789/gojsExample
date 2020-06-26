document.addEventListener("DOMContentLoaded", function(){
    // go의 graph object 생성
    var $ = go.GraphObject.make;
    // go의 무대가 될 html div 영역 설정
    var myDiagram =
    $(go.Diagram, "myDiagramDiv",
        { // enable Ctrl-Z to undo and Ctrl-Y to redo
        "undoManager.isEnabled": true
    });

    // go diagram의 node template 설정 : 모양이나 데이터 설정
    myDiagram.nodeTemplate = 
    $(go.Node, "Horizontal",  // node의 배치 형식 설정
        {background: "blue"}, // node의 색상 설정
        $(go.TextBlock,       // node안의 텍스트 블록 설정
            "Default Text",
            { margin: 12, stroke: "black", font: "bold 16px sans-serif" },
            new go.Binding("text", "name"))); // model의 데이터와 매핑 node.text = model.name 매핑
    // 모델 생성
    var myModel = $(go.Model);
    // 모델에 데이터 삽입
    myModel.nodeDataArray = [
    { name: "Alpha" },
    { name: "Beta" },
    { name: "Gamma" }
    ];
    // 다이어그램에 모델 삽입 -> 그려질 다이어그램들은 데이터 수만큼 생성
    myDiagram.model = myModel;
})