document.addEventListener("DOMContentLoaded", function(){
    // go 그래프 오브젝트 생성 : 객체 생성
    var $ = go.GraphObject.make;
    // go 그래프 오브젝트의 다이어그램과 html div id 매핑 : 그릴곳 지정 - 캔버스
    myDiagram = $(go.Diagram, "myDiagramDiv");
    var nodeDataArray = [
        { key: "Alpha" },
        { key: "Beta", group: "Omega" },
        { key: "Gamma", group: "Omega" },
        { key: "Omega", isGroup: true },
        { key: "Delta" }];
    var linkDataArray = [
        { from: "Alpha", to: "Beta" },
        { from: "Beta", to: "Gamma" },
        { from: "Omega", to: "Delta" }];

    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    // myDiagram.model = new go.GraphLinksModel(systemModel(), linkDataArray);
})