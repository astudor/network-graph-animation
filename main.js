/*************** HELPER FUNCTIONS **************/
function deepClone(source){
  // If the source isn't an Object or Array, throw an error.
  if ( !(source instanceof Object) || source instanceof Date || source instanceof String) {
    throw 'Only Objects or Arrays are supported.'
  }

  // Set the target data type before copying.
  var target = source instanceof Array ? [] : {};

  for (let prop in source){
    // Make sure the property isn't on the protoype
    if ( source instanceof Object && !(source instanceof Array) && !(source.hasOwnProperty(prop)) ) {
      continue;
    }

    // If the current property is an Array or Object, recursively clone it, else copy it's value
    if ( source[prop] instanceof Object && !(source[prop] instanceof Date) && !(source[prop] instanceof String) )  {
      target[prop] = deepClone(source[prop])
    } else {
      target[prop] = source[prop]
    }
  }

  return target;
}

function setTransform (el, elTransformArg) {
  var transfromString = ("rotate(" + elTransformArg.rot + "deg ) scale("
                         + elTransformArg.sca + ") skewX(" + elTransformArg.skx + "deg ) skewY("
                         + elTransformArg.sky + "deg )");

  // now attach that variable to each prefixed style
  element.style.webkitTransform = transfromString;
  element.style.MozTransform = transfromString;
  element.style.msTransform = transfromString;
  element.style.OTransform = transfromString;
  element.style.transform = transfromString;
}

// function scrollbarWidth() {
//   let barWidth = {
//     v: 0,
//     h: 0
//   }
//
//   barWidth.v = window.innerWidth - document.documentElement.clientWidth;
//   barWidth.h = window.innerHeight - document.documentElement.clientHeight;
//
//   return barWidth
// }


// function preventScroll() {
//   let prevOverflowStyle = document.body.style.overflow
//   document.body.style.overflow = 'hidden'
//   return prevOverflowStyle
// }
// function resetPreventScroll(prevOverflow) {
//   document.body.style.overflow = prevOverflow
// }

// fns used in visually moving element
function getElemTopLeft(el) {
  let pos = el.getBoundingClientRect()
  return {
    top: pos.top + window.scrollY,
    left: pos.left + window.scrollX,
  }
}


function getHAndW(el) {
  let rect = el.getBoundingClientRect()
  return {
    h: rect.height,
    w: rect.width
  }
}
// function createPlaceholder(dimensions, id) {
//   return `<div id=${id} style="width: ${dimensions.w}px; height:${dimensions.h}px"></div>`
// }

function setPosition(el, data) {
  let {pos, zIndex, left, top } = data
  if (pos) el.style.position = pos
  if (zIndex) el.style.zIndex = zIndex
  if (left || left == 0 || left == '0') el.style.left = left + 'px'
  if (top || top == 0 || top == '0') el.style.top = top + 'px'
}



function styleTransition(el, value) {
  el.style.MozTransition = value
  el.style.WebkitTransition = value
  el.style.transition = value
}
function animatePosition(el, data, duration) {
  if (duration) {
    var initTransStyle = el.style.transition
    let transitionValue = `left ${duration}s, top ${duration}s`
    styleTransition(el, transitionValue)
    if (data.start) setPosition(el, data.start)
  }

  setTimeout(function() { setPosition(el, data.end) }, 100 )

  if (duration) {
    setTimeout(function() { styleTransition(el, initTransStyle) }, duration*1000 )
  }
}
function manageSimpleInsert(el) {
  el.style.position = 'relative'
  el.style.zIndex = 1;
  el.style.left = 0
  el.style.top = 0;
}
function elToInitialTemplate(el, initialEl) {
  el.parentElement.insertBefore(initialEl, el)
  el.remove()
}
/**** fns particular for the case; depends on variables from context  ***/

/**** end fns particular for the case  ***/


// tooltip controller
var ttpJustDisplayed = false;

/******** END HELPER FUNCTIONS ********/



let networkData = {
  nodes: [
    {
      id: 'A1',
      label: 'A1 some long text here',
      pubs: 231,
      group: 'school pink',
    },
    {
      id: 'A2',
      pubs: 171,
      group: 'school orange',
      label: 'A2, some long text here'
    },
    {
      id: 'A3',
      pubs: 101,
      group: 'school green',
      label: 'A3, some long text here'
    },
    {
      id: 'A4',
      pubs: 121,
      group: 'school pink',
      label: 'A4, some long text here'
    },
    {
      id: 'A5',
      pubs: 31,
      group: 'school green',
      label: 'A5, some long text here'
    },
    {
      id: 'A6',
      pubs: 78,
      group: 'school pink',
      label: 'A6, some long text here'
    },
    {
      id: 'A7',
      pubs: 142,
      group: 'school pink',
      label: 'A7, some long text here'
    },
    {
      id: 'A8',
      pubs: 115,
      group: 'school orange',
      label: 'A8, some long text here'
    },
    {
      id: 'A9',
      pubs: 7,
      group: 'school green',
      label: 'A9, some long text here'
    },
    {
      id: 'A10',
      pubs: 0,
      group: 'school orange',
      label: 'A10, some long text here'
    },
    {
      id: 'A11',
      pubs: 257,
      group: 'school green',
      label: 'A11, some long text here'
    },
    {
      id: 'A12',
      pubs: 178,
      group: 'school pink',
      label: 'A12, some long text here'
    },
    {
      id: 'A13',
      pubs: 336,
      group: 'school green',
      label: 'A13, some long text here'
    },
    {
      id: 'A14',
      pubs: 82,
      group: 'school orange',
      label: 'A14, some long text here'
    },
    {
      id: 'A15',
      pubs: 56,
      group: 'school orange',
      label: 'A15, some long text here'
    },
    {
      id: 'A16',
      pubs: 19,
      group: 'school pink',
      label: 'A16, some long text here'
    },
    {
      id: 'A17',
      pubs: 26,
      group: 'school green',
      label: 'A17, some long text here'
    },
     {
      id: 'A18',
      pubs: 26,
      group: 'school orange',
      label: 'A18, some long text here'
    },

  ],
  links: [
    {
      id: 'l1', // id needed to identify link when creating pubs preview
      source: 'A1',
      target: 'A4',
      jointPubs: 85,
      somePubs: {
        idP1: { title: 'pub-1 Title', description: 'A4-link some description here 1'},

        idP2: { title: 'pub-2 Title', description: 'A4-link some description here 2'},
        idP3: { title: 'pub-3 Title', description: 'A4-link some description here 3'},
      }
    },
    {
      id: 'l2',
      source: 'A1',
      target: 'A7',
      jointPubs: 85,
      somePubs: {
        idP1: { title: 'pub-1 Title', description: 'A7-link some description here 1'},

        idP2: { title: 'pub-2 Title', description: 'A7-link some description here 2'},
       idP3: { title: 'pub-3 Title', description: 'A7-link some description here 3'},
      }
    },
    {
      id: 'l3',
      source: 'A1',
      target: 'A8',
      jointPubs: 110,
      somePubs: {
        idP1: { title: 'pub-1 Title', description: 'A8-link some description here 1'},

        idP2: { title: 'pub-2 Title', description: 'A8-link some description here 2'},
       idP3: { title: 'pub-3 Title', description: 'A8-link some description here 3'},
      }
    },
    {
      id: 'l4',
      source: 'A1',
      target: 'A9',
      jointPubs: 15,
      somePubs: {
        idP1: { title: 'pub-1 Title', description: 'A9-link some description here 1'},

        idP2: { title: 'pub-2 Title', description: 'A9-link some description here 2'},
       idP3: { title: 'pub-3 Title', description: 'A9-link some description here 3'},
      }
    },
    {
      id: 'l5',
      source: 'A2',
      target: 'A3',
      jointPubs: 70,
      somePubs: {
        idP1: { title: 'pub-1 Title', description: 'A10-link some description here 1'},

        idP2: { title: 'pub-2 Title', description: 'A10-link some description here 2'},
       idP3: { title: 'pub-3 Title', description: 'A10-link some description here 3'},
      }
    },
    {
      id: 'l6',
      source: 'A2',
      target: 'A4',
      jointPubs: 45,
    },
    {
      id: 'l7',
      source: 'A2',
      target: 'A13',
      jointPubs: 7,
    },
    {
      id: 'l8',
      source: 'A2',
      target: 'A14',
      jointPubs: 23,
    },
    {
      id: 'l9',
      source: 'A2',
      target: 'A16',
      jointPubs: 19,
    },
    {
      id: 'l10',
      source: 'A8',
      target: 'A16',
      jointPubs: 9,
    },
    {
      id: 'l11',
      source: 'A8',
      target: 'A11',
      jointPubs: 100,
    },
    {
      id: 'l12',
      source: 'A8',
      target: 'A16',
      jointPubs: 64,
    },
    {
      id: 'l13',
      source: 'A6',
      target: 'A17',
      jointPubs: 12,
    },
    {
      id: 'l14',
      source: 'A18',
      target: 'A17',
      jointPubs: 27,
    },
    {
      id: 'l15',
      source: 'A12',
      target: 'A17',
      jointPubs: 82,
    },
    {
      id: 'l16',
      source: 'A3',
      target: 'A15',
      jointPubs: 12,
    },
    {
      id: 'l17',
      source: 'A3',
      target: 'A1',
      jointPubs: 12,
    },
  ]
}

var myScale = d3.scaleLinear() //node Scale (will become node circle radius)
  .domain([0, 300])
  .range([3, 10]);
var myScale2 = d3.scaleLinear() // link scale (will become link's stroke-width)
  .domain([0, 300])
  .range([1, 6]);


function prepData(data) { // fn to prepare final data for network graph
  let finalNodes = data.nodes.map(d => {
    d.deleteThisTestProp = 3
    d.weight = myScale(d.pubs)
    var cleanPlaceholder = Object.create(d)
    return cleanPlaceholder
  })

  let finalLinks = data.links.map(d => {
    d.deleteThisProp = 'xyz'
    var cleanPlaceholder = Object.create(d)
    return cleanPlaceholder
  })

  data.nodes = finalNodes
  data.links = finalLinks
  return data
}
networkData = prepData(networkData)

function color() {
  const scale = d3.scaleOrdinal(d3.schemeCategory10);
  return d => scale(d.group);
}


// ttp related fns
function createTtpContent(data) {
  let keys = Object.keys(data.somePubs)
  let tpl = ''
  keys.forEach(key => tpl += `<p>${data.somePubs[key].description}</p>`)

  return tpl
}

function positionTtp(relativeNode, ttpSelection) {
  let mousePos = d3.mouse(relativeNode)

  ttpSelection.style('left', mousePos[0] + 30 +'px')
    .style('top', mousePos[1] - 30 + 'px')
}
// fn to hide ttpBox if clicked anywhere outside it
// should be adapted for an entire project, to check and dismiss any type of tooltip/popup/overlayer
function hideTtpIfVisible(e) {
  e.preventDefault()
  if (ttpJustDisplayed) {
    ttpJustDisplayed = false
    return;
  }

  let ttp = document.querySelector('.tooltip.show')
  if (!ttp) return

  if (ttp.contains(e.target)) return

  // else
  ttp.classList.remove('show')
  ttp.classList.add('hide')
}
document.addEventListener('click', hideTtpIfVisible)
// end ttp related fns


function getDataForG2(nodeId, dataPool) {
  let dataForG2 = { // WE NEED TO DEEPCLONE or make another request
    nodes: [],
    links: []
  }


  dataForG2 = dataPool.links.reduce((acc, link, idx, linksArr) => {
    let isIdentifiedLink = (link.source.id == nodeId || link.target.id == nodeId)
    if (!isIdentifiedLink) return acc

    // compose initLink
    acc.links.push(link.__proto__)

    // compose initNodes
    let nodeOfLinkSourceWasCreated = (createdNode) => {
      createdNode.id == link.source.__proto__.id
    }
    let nodeOfLinkTargetWasCreated = (createdNode) => {
      createdNode.id == link.target.id
    }
    if (!acc.nodes.find(nodeOfLinkSourceWasCreated)) acc.nodes.push(link.source.__proto__)
    if (!acc.nodes.find(nodeOfLinkTargetWasCreated)) acc.nodes.push(link.target.__proto__)

    return acc

  }, dataForG2)


  return dataForG2
}

function drag(simulation) {

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}
function center(d) {
  return d3.zoomIdentity.scale(3.2).translate(-d.x, -d.y)
}



function adaptCoordsForScaledBox(coords, nonScaledElHAndW, scaledElHAndW) {
  // move to left a distance equal with number of pixels from left border of scaled version of element to left border of unscaled version element
  // same with top
  let initW = nonScaledElHAndW.w
  let initH = nonScaledElHAndW.h
  let scaledW = scaledElHAndW.w
  let scaledH = scaledElHAndW.h

  coords.left = coords.left - (initW/2 - scaledW/2)
  coords.top = coords.top - (initH/2 - scaledH/2)
  return coords
}


function transitionToG2(attrs) {
  let {d, i, g, svg, opt, linkBox, zoom } = attrs
    if (!graph_1_isActive) return;

    svg.transition().duration(550)
      .call(zoom.transform, center(d))

    d3.select(g[i]).select('circle')
      .transition().delay(600)
      .attr('class', 'active-node')
      // .duration(500)
      // .attr('fill', '#333')

    let clickedNodeData = d

    linkBox.selectAll('line')
      .filter((d,i,g) => {
        return (d.target.id === clickedNodeData.id || d.source.id === clickedNodeData.id)
      })
      .each((d, i, g) => {
        d3.select(g[i]).transition().delay(600)
        // .duration(500)
          .attr('class', 'active-link')
          // .attr('stroke', '#333')
          // .attr('stroke-opacity', 1)
      })

  let scaleAmount = 0.46
  let svgBox = svg.node().parentElement
  let initSvgBoxHAndW = getHAndW(svgBox)
  let scaledSvgBoxHAndW = {
    w: initSvgBoxHAndW.w * scaleAmount,
    h: initSvgBoxHAndW.h * scaleAmount
  }
  let topLeftCoordsAtStart = getElemTopLeft(svgBox) // we have to compute this before scaling
  // if we want append the scaled element as direct child of dom and to position it absolute in its current position,
  // we have to use the coords the element had before being scaled

    svg.transition()
      .delay(1000)
      .select((d,i,g) => g[i].parentElement)
        .style('transform', `matrix(${scaleAmount}, 0, 0, ${scaleAmount}, 0,0)`)
    svg.transition()
      .delay(1100).style('border', '2px solid black')
  let legend = document.querySelector(opt.domSelectors.legend)

  function animSelectedNode() {
    /* visually position it (absolute) in same position, but direct child of Body */
    let startPos = {...topLeftCoordsAtStart, ...{pos: 'absolute', zIndex: 9} }
    setPosition(svgBox, startPos) // even if elem is scaled, it needs same top-left as if it wouldn't be
    document.body.appendChild(svgBox)

    /* visually position it (absolute) in target position - still direct child of body */
    let coordsForAbsolutePosEnd = adaptCoordsForScaledBox(getElemTopLeft(legend), initSvgBoxHAndW, scaledSvgBoxHAndW)


    let animateLegendData = {
      start: {
        left: 0,
        top: 0,
      },
      end: {
        pos: 'relative',
        left: 0,
        top: scaledSvgBoxHAndW.h + 20
      }
    };
    animatePosition(legend, animateLegendData, .3)
    setTimeout( function() {
      animatePosition(svgBox, {end: coordsForAbsolutePosEnd}, .5)
    }, 100)

    // insert
    setTimeout( function() {
      legend.parentElement.insertBefore(svgBox, legend)
      manageSimpleInsert(svgBox)
      manageSimpleInsert(legend)
      manageInsertSvgInSidebar(svgBox)
    }, 1400)



    function manageInsertSvgInSidebar() {
      svgBox.style.transformOrigin = 'left top'
      svgBox.style.marginBottom = -(initSvgBoxHAndW.h - scaledSvgBoxHAndW.h) + 'px'
      svgBox.style.height = scaledSvgBoxHAndW.h
    }
  }

  setTimeout( function() {
    animSelectedNode()
    graph_1_isActive = false
  }, 1300)



    // create data to use in 'Focused' visualization and trigger 'Focused' visualization
    let dataForFocusedVis = getDataForG2(d.id, opt.data)
    setTimeout( ()=>{
      let g2Parent = document.querySelector('.detail-network-graph-box')
      g2Parent.classList.remove('hide')
      chart( {
         data: dataForFocusedVis,
         width: graphW,
         height: graphH,
         domSelectors: {
          svg: '#prof-detail-graph'
         },
        activeGraph1: false
       })

    }, 2000)

  }


// main fn to create graph -- to be refined
var graph_1_isActive = false;
var initG2 = document.querySelector('#projection .detail-network-graph-box')

function chart(opt) {

  if (opt.activeGraph1) graph_1_isActive = true;
  if (!opt.activeGraph1) graph_1_isActive = false;

  var links = opt.data.links
  var nodes = opt.data.nodes

  var simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id))
  .force("charge", d3.forceManyBody().strength(-180))
  .force("x", d3.forceX())
  .force("y", d3.forceY())

  const {width, height} = opt


  // should refactor to create here svgElement and insert it somewhere?
  var svg = d3.select(opt.domSelectors.svg)
    .attr('height', height)
    .attr('width', width)
    .attr('viewBox', [-width / 2, -height / 2, width, height])


  const box = svg.append("g")
    .attr('class', 'graph-wrapper')

  let zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", zoomed);

  function zoomed() {
    box.attr("transform", d3.event.transform)
  }

  const linkBox = box.append("g")
    .attr('class', 'link-box')
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)

  const link = linkBox.selectAll("line")
    .data(links)
    .enter()
    .append('line')
    .attr('class', 'link')
    .attr("stroke-width", d => myScale2(d.jointPubs))
    .on('click', setTtpBox)


  const node = box.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll('g')
    .data(nodes)
    .enter()
    .append('g')

  node.call(drag(simulation));

  node.append('circle')
    .attr("r", d => d.weight)
    .attr("fill", color())

 node.append('text')
   .text(d => d.label)
   .attr('stroke-width', .1)
   .attr('font-size', 6) // d => d.weight
   .attr('text-anchor', 'middle')
   .attr('dy', d => -d.weight*1.2)

 node.append('text')
   .text(d => d.pubs)
   .attr('stroke-width', .1)
   .attr('fill', '#fff')
   .attr('font-size', 4)
   .attr('text-anchor', 'middle')
   .attr('dy', 1)

  node.append("title")
    .text(d => d.label);

  node.on('click', (d,i,g) => {
     let attrs = {
       d: d,
       i: i,
       g: g,
       svg: svg,
       opt: opt,
       linkBox: linkBox,
       zoom: zoom
     }
     opt.behaveAtSelect(attrs)
  })

  svg.call(zoom)

  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)


    node.attr('transform', d => `translate(${d.x}, ${d.y})`)

  });


  function setTtpBox(d,i,g) {
    if (!graph_1_isActive) return;
    if (!d.somePubs) return // maybe put also error in console

    let networkBox = d3.select('#projection')
    let ttpBox = d3.select('#coPubs') // replace coPubs with other id that signals a type of 'tooltip' - yep, id, as there should not be more tooltips of same type visible at same time

    // stop setTtpBox execution from re-displaying same tooltip
    if (ttpBox.size() && ttpBox.classed('show')) return;


    if (!ttpBox.size()) {
      ttpBox = networkBox.append('div')
        .attr('id', 'coPubs')
        .classed('tooltip', true)
        .classed('show', true)
      ttpJustDisplayed = true;
    }
    else {
     ttpBox.html('').classed('hide', false).classed('show', true)
      ttpJustDisplayed = true;
    }


    ttpBox.html(createTtpContent(d))

    positionTtp(networkBox.node(), ttpBox)
  }
}

var graphW = 800,
    graphH = 750


function render() {
  var initG2El = document.querySelector('.detail-network-graph-box').cloneNode(true)
  function transitionBackToG1(e) {
    e.preventDefault()
    if (graph_1_isActive) return

    // params needed g1, g2Box, initG2El
    // these params can be set in clicked element 'data-' attribute, in order to be inside this fn
    let g1 = document.querySelector('.network-graph-box') // add also id to this div, to be specific
    let g2 = document.querySelector('.detail-network-graph-box') // add also id to this div, to be specific
    let projZone = document.querySelector('#projection')

    let g1HAndW = getHAndW(g1.querySelector('svg'))
    let g1LeftTop = getElemTopLeft(g1)
    let g1AbsPosLeftTop = adaptCoordsForScaledBox(g1LeftTop, {w: graphW, h: graphH}, g1HAndW)
    let g1AbsStartPosData = {
      left: g1LeftTop.left,
      top:g1LeftTop.top,
      pos: 'absolute',
      zIndex:9
    }
    let g1Sibling = g1.nextElementSibling
    if (g1Sibling) {
      setPosition(g1Sibling, {top: g1HAndW.h+20, pos: 'relative'})
      g1.style.transition = 'top 1s'
    }

    g1.style.transformOrigin = 'center center'
    setPosition(g1, g1AbsStartPosData)
    document.body.appendChild(g1)

    //effectsBeforeMoveSvgToProjectionZone
    elToInitialTemplate(g2, initG2El)

    // MoveSvgToProjectionZone
    animatePosition(g1, {end: getElemTopLeft(projZone)}, 1)
    if (g1Sibling) animatePosition(g1Sibling, {end: {top: 0}}, 1)

    // effectsAfterMoveSvgToProjectionZone
    setTimeout(() => {
      let svg = d3.select('.network-graph-box svg')
      // revertGraphSelectionEffects(svg)
    }, 1000)
    function revertGraphSelectionEffects(selection) {
      let activeNode = selection.select('.active-node')
      let activeLinks = selection.selectAll('.active-link')
      selection.transition().duration(500).style('border', 'transparent')

      activeNode.transition().duration(500).attr('fill', null)
      // console.log(activeLinks)
      // activeLinks.each((d,i,g) => d.style(''))
    }
    // effectsBeforeInsertSvgInProjectionZone()

    // function effectsBeforeInsertSvgInProjectionZone(subj) {
    //   let svg = d3.select(subj.find('svg'))
    //   // svg remove selection effects
    //
    //   subj.style.transform = scale(1)
    //   // svg - set to initial state
    // }
    //
    // projection.appendChild(g1)
    // setPosition(g1, {left:0, top:0, pos:relative, zIndex:1})

    graph_1_isActive = true;
  }
  chart({
    data: networkData,
    width: graphW,
    height: graphH,
    behaveAtSelect: transitionToG2,
    activeGraph1: true,
    domSelectors: {
      svg: '#prof-graph',
      targetPlaceAtMinimize:'[data-network-graph-ref]',
      legend: '.legend-box'
    },

  })

  let btn = document.querySelector('button')
  transTime = 1
  transitionValue = `left ${transTime}s, top ${transTime}s`

  btn.addEventListener('click', transitionBackToG1)
  // btn.addEventListener('click', (e) => {
  //   e.preventDefault()
  //   transitionToG1()
  // })
}




document.addEventListener('DOMContentLoaded', render, false);
