(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[151],{87109:function(e,t,s){"use strict";s.d(t,{Z:function(){return z}});var a,l=s(63366),i=s(87462),n=s(67294),r=s(86010),o=s(94780),c=s(98216),d=s(15861),u=s(47167),h=s(74423),x=s(90948),m=s(1588),Z=s(34867);function j(e){return(0,Z.Z)("MuiInputAdornment",e)}let v=(0,m.Z)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]);var g=s(71657),p=s(85893);let f=["children","className","component","disablePointerEvents","disableTypography","position","variant"],b=(e,t)=>{let{ownerState:s}=e;return[t.root,t[`position${(0,c.Z)(s.position)}`],!0===s.disablePointerEvents&&t.disablePointerEvents,t[s.variant]]},S=e=>{let{classes:t,disablePointerEvents:s,hiddenLabel:a,position:l,size:i,variant:n}=e,r={root:["root",s&&"disablePointerEvents",l&&`position${(0,c.Z)(l)}`,n,a&&"hiddenLabel",i&&`size${(0,c.Z)(i)}`]};return(0,o.Z)(r,j,t)},y=(0,x.ZP)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:b})(({theme:e,ownerState:t})=>(0,i.Z)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(e.vars||e).palette.action.active},"filled"===t.variant&&{[`&.${v.positionStart}&:not(.${v.hiddenLabel})`]:{marginTop:16}},"start"===t.position&&{marginRight:8},"end"===t.position&&{marginLeft:8},!0===t.disablePointerEvents&&{pointerEvents:"none"})),C=n.forwardRef(function(e,t){let s=(0,g.Z)({props:e,name:"MuiInputAdornment"}),{children:o,className:c,component:x="div",disablePointerEvents:m=!1,disableTypography:Z=!1,position:j,variant:v}=s,b=(0,l.Z)(s,f),C=(0,h.Z)()||{},z=v;v&&C.variant,C&&!z&&(z=C.variant);let w=(0,i.Z)({},s,{hiddenLabel:C.hiddenLabel,size:C.size,disablePointerEvents:m,position:j,variant:z}),A=S(w);return(0,p.jsx)(u.Z.Provider,{value:null,children:(0,p.jsx)(y,(0,i.Z)({as:x,ownerState:w,className:(0,r.Z)(A.root,c),ref:t},b,{children:"string"!=typeof o||Z?(0,p.jsxs)(n.Fragment,{children:["start"===j?a||(a=(0,p.jsx)("span",{className:"notranslate",children:"​"})):null,o]}):(0,p.jsx)(d.Z,{color:"text.secondary",children:o})}))})});var z=C},29469:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/99-ew9c8/footer-navigations",function(){return s(64830)}])},39070:function(e,t,s){"use strict";s.d(t,{Z:function(){return h}});var a=s(85893);s(67294);var l=s(98396),i=s(12937);let n=()=>[{title:"الأقسام",path:"/99-ew9c8/categories",icon:"material-symbols:category"},{title:"الأخبار",path:"/99-ew9c8/posts",icon:"bx:news"},{title:"خدمات",path:"/99-ew9c8/services",icon:"eos-icons:service"},{title:"ادارة القائمة الرئيسية",path:"/99-ew9c8/header-navigations",icon:"subway:menu"},{title:"ادارة  القائمة بالاسفل",path:"/99-ew9c8/footer-navigations",icon:"subway:menu"},{title:"مركز الاتصالات",path:"/99-ew9c8/contacts",icon:"bx:chat"},{title:"الاعدادات",path:"/99-ew9c8/setting",icon:"tabler:settings"}];var r=s(23664),o=s(29375),c=s(21958),d=s(28756);let u=e=>{let{children:t,contentHeightFixed:s}=e,{settings:u,saveSettings:h}=(0,d.r)(),x=(0,l.Z)(e=>e.breakpoints.down("lg"));return x&&"horizontal"===u.layout&&(u.layout="vertical"),(0,a.jsx)(i.Z,{hidden:x,settings:u,saveSettings:h,contentHeightFixed:s,verticalLayoutProps:{navMenu:{navItems:n()},appBar:{content:e=>(0,a.jsx)(o.Z,{hidden:x,settings:u,saveSettings:h,toggleNavVisibility:e.toggleNavVisibility})}},..."horizontal"===u.layout&&{horizontalLayoutProps:{navMenu:{navItems:(0,r.Z)()},appBar:{content:()=>(0,a.jsx)(c.Z,{settings:u,saveSettings:h})}}},children:t})};var h=u},64830:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return T}});var a=s(85893),l=s(67294),i=s(87357),n=s(34386),r=s(83321),o=s(66242),c=s(78445),d=s(15861),u=s(61903),h=s(93946),x=s(67720),m=s(62303),Z=s(79878),j=s(39070),v=s(50657),g=s(37645),p=s(6514),f=s(94054),b=s(33841),S=s(18360),y=s(18972),C=s(72890),z=s(50480),w=s(49033),A=s(87109),W=s(31425),E=s(98456),_=s(9134),P=s(51566);let k=e=>{let{open:t,categories:s,onSuccess:n,onClose:o}=e,[c,x]=(0,l.useState)(!1),[m,j]=(0,l.useState)("الأقسام الرئيسة"),[k,M]=(0,l.useState)(""),[N,I]=(0,l.useState)("static"),[L,T]=(0,l.useState)(!1),[R,H]=(0,l.useState)(""),[$,D]=(0,l.useState)("home"),[F,O]=(0,l.useState)("");(0,l.useEffect)(()=>{t&&(M(""),I("static"),H(s.length?s[0]._id:""),D("home"),O(""))},[t]);let V=async()=>{if(""===k.trim())_.Am.error("رجاء أدخل اسم القائمة");else if("static"===N&&"true"==L&&""===F.trim())_.Am.error("رجاء ادخل رابط القائمة");else if("static"===N&&"false"==L&&""===$.trim())_.Am.error("الرجاء اختيار صفحة محلية.");else if("category"===N&&""===R.trim())_.Am.error("اختيار القائمة");else try{x(!0);let{data:e}=await P.Z.post("/admin/footer-navigations",{label:m,name:k,type:N,isExternal:"true"==L,page:$,url:F,category:R});e.status?(_.Am.success(e.msg),n(),setTimeout(()=>o(),500)):_.Am.error(e.msg)}catch(e){_.Am.error(e.message)}finally{setTimeout(()=>x(!1),500)}};return(0,a.jsxs)(v.Z,{fullWidth:!0,maxWidth:"xs",open:t,onClose:o,sx:{"& .MuiDialog-paper":{overflow:"visible"}},children:[(0,a.jsxs)(g.Z,{sx:{p:4},children:[(0,a.jsx)(d.Z,{variant:"h5",component:"span",children:"اضافة قائمة جديدة"}),(0,a.jsx)(h.Z,{sx:{position:"absolute",top:9,right:9},onClick:o,children:(0,a.jsx)(Z.Z,{icon:"tabler:x",fontSize:"1.25rem"})})]}),(0,a.jsxs)(p.Z,{dividers:!0,children:[(0,a.jsxs)(f.Z,{fullWidth:!0,sx:{mb:5},children:[(0,a.jsx)(b.Z,{size:"small",children:"تسمية العنصر"}),(0,a.jsxs)(S.Z,{size:"small",label:"تسمية العنصر",value:m,onChange:e=>j(e.target.value),children:[(0,a.jsx)(y.Z,{value:"الأقسام الرئيسة",children:"الأقسام الرئيسة"}),(0,a.jsx)(y.Z,{value:"نشاطات",children:"نشاطات"})]})]}),(0,a.jsx)(f.Z,{fullWidth:!0,sx:{mb:5},children:(0,a.jsx)(u.Z,{label:"اسم",size:"small",value:k,onChange:e=>M(e.target.value)})}),(0,a.jsxs)(f.Z,{fullWidth:!0,sx:{mb:"static"===N?0:5},children:[(0,a.jsx)(b.Z,{size:"small",children:"نوع القائمة"}),(0,a.jsxs)(S.Z,{label:"نوع القائمة",size:"small",value:N,onChange:e=>I(e.target.value),children:[(0,a.jsx)(y.Z,{value:"static",children:"ثابت"}),(0,a.jsx)(y.Z,{value:"category",children:"القسم"})]})]}),"static"===N?(0,a.jsxs)(i.Z,{children:[(0,a.jsxs)(C.Z,{row:!0,value:L,onChange:e=>T(e.target.value),children:[(0,a.jsx)(z.Z,{value:!1,control:(0,a.jsx)(w.Z,{}),label:"محلي"}),(0,a.jsx)(z.Z,{value:!0,control:(0,a.jsx)(w.Z,{}),label:"خارجي"})]}),"true"==L?(0,a.jsx)(f.Z,{fullWidth:!0,dir:"ltr",children:(0,a.jsx)(u.Z,{size:"small",label:"رابط",InputProps:{startAdornment:(0,a.jsx)(A.Z,{position:"start",children:"https://"})},value:F,onChange:e=>O(e.target.value)})}):(0,a.jsxs)(f.Z,{fullWidth:!0,children:[(0,a.jsx)(b.Z,{size:"small",children:"نوع"}),(0,a.jsxs)(S.Z,{label:"نوع",size:"small",value:$,onChange:e=>D(e.target.value),children:[(0,a.jsx)(y.Z,{value:"home",children:"الصفحة الرئيسية"}),(0,a.jsx)(y.Z,{value:"section",children:"القسم"}),(0,a.jsx)(y.Z,{value:"online-payments",children:"خدمات الدفع الالكتروني"}),(0,a.jsx)(y.Z,{value:"contact-us",children:"اتصل بنا"})]})]})]}):(0,a.jsxs)(f.Z,{fullWidth:!0,children:[(0,a.jsx)(b.Z,{size:"small",children:"القسم"}),(0,a.jsx)(S.Z,{label:"القسم",size:"small",value:R,onChange:e=>H(e.target.value),children:s.map((e,t)=>(0,a.jsx)(y.Z,{value:e._id,children:e.name},t))})]})]}),(0,a.jsxs)(W.Z,{sx:{p:"1rem !important"},children:[(0,a.jsx)(r.Z,{variant:"contained",color:"primary",disabled:c,startIcon:c&&(0,a.jsx)(E.Z,{color:"inherit",size:16}),onClick:V,children:"إنشاء"}),(0,a.jsx)(r.Z,{variant:"contained",color:"error",onClick:o,children:"إلغاء"})]})]})},M=e=>{let{open:t,categories:s,navigation:n,onSuccess:o,onClose:c}=e,[x,m]=(0,l.useState)(!1),[j,k]=(0,l.useState)("الأقسام الرئيسة"),[M,N]=(0,l.useState)(""),[I,L]=(0,l.useState)("static"),[T,R]=(0,l.useState)(!1),[H,$]=(0,l.useState)(n.category?n.category:""),[D,F]=(0,l.useState)("home"),[O,V]=(0,l.useState)("");(0,l.useEffect)(()=>{t&&(k(n.label),N(n.name),L(n.type),$(n.category?n.category:""),F(n.page?n.page:""),V(n.url?n.url:""))},[t]);let B=async()=>{if(""===M.trim())_.Am.error("رجاء أدخل اسم القائمة");else if("static"===I&&"true"==T&&""===O.trim())_.Am.error("رجاء ادخل رابط القائمة");else if("static"===I&&"false"==T&&""===D.trim())_.Am.error("الرجاء اختيار صفحة محلية.");else if("category"===I&&""===H.trim())_.Am.error("اختيار القائمة");else try{m(!0);let e=n._id,{data:t}=await P.Z.put("/admin/footer-navigations/".concat(e),{label:j,name:M,type:I,isExternal:"true"==T,page:D,url:O,category:H});t.status?(_.Am.success(t.msg),o(),setTimeout(()=>c(),500)):_.Am.error(t.msg)}catch(e){_.Am.error(e.message)}finally{setTimeout(()=>m(!1),500)}};return(0,a.jsxs)(v.Z,{fullWidth:!0,maxWidth:"xs",open:t,onClose:c,sx:{"& .MuiDialog-paper":{overflow:"visible"}},children:[(0,a.jsxs)(g.Z,{sx:{p:4},children:[(0,a.jsx)(d.Z,{variant:"h5",component:"span",children:"نعديل القائمة"}),(0,a.jsx)(h.Z,{sx:{position:"absolute",top:9,right:9},onClick:c,children:(0,a.jsx)(Z.Z,{icon:"tabler:x",fontSize:"1.25rem"})})]}),(0,a.jsxs)(p.Z,{dividers:!0,children:[(0,a.jsxs)(f.Z,{fullWidth:!0,sx:{mb:5},children:[(0,a.jsx)(b.Z,{size:"small",children:"تسمية العنصر"}),(0,a.jsxs)(S.Z,{size:"small",label:"تسمية العنصر",value:j,onChange:e=>k(e.target.value),children:[(0,a.jsx)(y.Z,{value:"الأقسام الرئيسة",children:"الأقسام الرئيسة"}),(0,a.jsx)(y.Z,{value:"نشاطات",children:"نشاطات"})]})]}),(0,a.jsx)(f.Z,{fullWidth:!0,sx:{mb:5},children:(0,a.jsx)(u.Z,{label:"اسم",size:"small",value:M,onChange:e=>N(e.target.value)})}),(0,a.jsxs)(f.Z,{fullWidth:!0,sx:{mb:"static"===I?0:5},children:[(0,a.jsx)(b.Z,{size:"small",children:"نوع القائمة"}),(0,a.jsxs)(S.Z,{label:"نوع القائمة",size:"small",value:I,onChange:e=>L(e.target.value),children:[(0,a.jsx)(y.Z,{value:"static",children:"ثابت"}),(0,a.jsx)(y.Z,{value:"category",children:"القسم"})]})]}),"static"===I?(0,a.jsxs)(i.Z,{children:[(0,a.jsxs)(C.Z,{row:!0,value:T,onChange:e=>R(e.target.value),children:[(0,a.jsx)(z.Z,{value:!1,control:(0,a.jsx)(w.Z,{}),label:"محلي"}),(0,a.jsx)(z.Z,{value:!0,control:(0,a.jsx)(w.Z,{}),label:"خارجي"})]}),"true"==T?(0,a.jsx)(f.Z,{fullWidth:!0,dir:"ltr",children:(0,a.jsx)(u.Z,{size:"small",label:"رابط",InputProps:{startAdornment:(0,a.jsx)(A.Z,{position:"start",children:"https://"})},value:O,onChange:e=>V(e.target.value)})}):(0,a.jsxs)(f.Z,{fullWidth:!0,children:[(0,a.jsx)(b.Z,{size:"small",children:"نوع"}),(0,a.jsxs)(S.Z,{label:"نوع",size:"small",value:D,onChange:e=>F(e.target.value),children:[(0,a.jsx)(y.Z,{value:"home",children:"الصفحة الرئيسية"}),(0,a.jsx)(y.Z,{value:"section",children:"القسم"}),(0,a.jsx)(y.Z,{value:"online-payments",children:"خدمات الدفع الالكتروني"}),(0,a.jsx)(y.Z,{value:"contact-us",children:"اتصل بنا"})]})]})]}):(0,a.jsxs)(f.Z,{fullWidth:!0,children:[(0,a.jsx)(b.Z,{size:"small",children:"القسم"}),(0,a.jsx)(S.Z,{label:"القسم",size:"small",value:H,onChange:e=>$(e.target.value),children:s.map((e,t)=>(0,a.jsx)(y.Z,{value:e._id,children:e.name},t))})]})]}),(0,a.jsxs)(W.Z,{sx:{p:"1rem !important"},children:[(0,a.jsx)(r.Z,{variant:"contained",color:"primary",disabled:x,startIcon:x&&(0,a.jsx)(E.Z,{color:"inherit",size:16}),onClick:B,children:"تحديث"}),(0,a.jsx)(r.Z,{variant:"contained",color:"error",onClick:c,children:"إلغاء"})]})]})};var N=s(58951);let I=e=>{let{open:t,navigation:s,onSuccess:i,onClose:n}=e,[o,c]=(0,l.useState)(!1),u=async()=>{try{let e=s._id,{data:t}=await P.Z.delete("/admin/footer-navigations/".concat(e));t.status?(_.Am.success(t.msg),i(),n()):_.Am.error(t.msg)}catch(e){_.Am.error(e.message)}finally{setTimeout(()=>c(!1),500)}};return(0,a.jsxs)(v.Z,{open:t,onClose:n,children:[(0,a.jsx)(g.Z,{children:(0,a.jsx)(d.Z,{variant:"h5",children:"يرجى تأكيد حذف القائمة?"})}),(0,a.jsx)(p.Z,{children:(0,a.jsx)(N.Z,{children:"ننوه بعد حذف القائمة لا يمكنك الرجوع لاحقا عن هذا الأمر"})}),(0,a.jsxs)(W.Z,{className:"dialog-actions-dense",children:[(0,a.jsxs)(r.Z,{variant:"contained",disabled:o,onClick:u,children:[o&&(0,a.jsx)(E.Z,{color:"secondary",size:18,sx:{mr:2}})," حذف"]}),(0,a.jsx)(r.Z,{variant:"contained",color:"error",onClick:n,children:"إلغاء"})]})]})},L=()=>{let[e,t]=(0,l.useState)(""),[s,j]=(0,l.useState)([]),[v,g]=(0,l.useState)([]),[p,f]=(0,l.useState)({}),[b,S]=(0,l.useState)({page:0,pageSize:10}),[y,C]=(0,l.useState)(!1),[z,w]=(0,l.useState)(!1),[A,W]=(0,l.useState)(!1),[E,_]=(0,l.useState)(!1);(0,l.useEffect)(()=>{N()},[]),(0,l.useEffect)(()=>{L()},[y,e]);let N=async()=>{let{data:e}=await P.Z.get("/admin/categories");j(e)},L=async()=>{let{data:t}=await P.Z.get("/admin/footer-navigations",{params:{search:e}});g(t)},T=(e,t)=>{e.stopPropagation(),f(t),W(!0)},R=(e,t)=>{e.stopPropagation(),f(t),_(!0)};return(0,a.jsxs)(o.Z,{children:[(0,a.jsx)(c.Z,{title:(0,a.jsx)(d.Z,{variant:"h4",children:"ادارة القائمة الأخيرة"}),action:(0,a.jsxs)(i.Z,{sx:{display:"flex",gap:3},children:[(0,a.jsx)(u.Z,{size:"small",placeholder:"البحث",value:e,onChange:e=>t(e.target.value),InputProps:{startAdornment:(0,a.jsx)(i.Z,{sx:{mr:2,display:"flex"},children:(0,a.jsx)(Z.Z,{fontSize:"1.25rem",icon:"tabler:search"})}),endAdornment:(0,a.jsx)(h.Z,{size:"small",title:"Clear","aria-label":"Clear",onClick:()=>t(""),children:(0,a.jsx)(Z.Z,{fontSize:"1.25rem",icon:"tabler:x"})})}}),(0,a.jsx)(r.Z,{variant:"contained",startIcon:(0,a.jsx)(Z.Z,{icon:"mdi:plus"}),onClick:()=>w(!0),children:"قائمة جديدة"})]})}),(0,a.jsx)(x.Z,{}),(0,a.jsx)(m._,{autoHeight:!0,rowHeight:60,getRowId:e=>e._id,columns:[{flex:1,maxWidth:250,field:"label",headerName:"تسمية العنصر",renderCell:e=>{let{row:t}=e;return t.label}},{flex:1,field:"title",maxWidth:250,headerName:"عنوان",renderCell:e=>{let{row:t}=e;return t.name}},{flex:1,field:"url",headerName:"رابط",renderCell:e=>{let{row:t}=e;return"static"===t.type?(0,a.jsx)(i.Z,{dir:"ltr",children:t.isExternal?t.url:"/".concat(t.page)}):(0,a.jsxs)(i.Z,{dir:"ltr",children:["","/categories/",t.category]})}},{flex:1,maxWidth:110,field:"action",headerName:"الإجراء",renderCell:e=>{let{row:t}=e;return(0,a.jsxs)(i.Z,{sx:{display:"flex",gap:2},children:[(0,a.jsx)(n.Z,{title:"edit",children:(0,a.jsx)(r.Z,{variant:"contained",size:"small",sx:{minWidth:35,px:0},onClick:e=>T(e,t),children:(0,a.jsx)(Z.Z,{icon:"tabler:edit"})})}),(0,a.jsx)(n.Z,{title:"delete",children:(0,a.jsx)(r.Z,{variant:"contained",color:"error",size:"small",sx:{minWidth:35,px:0},onClick:e=>R(e,t),children:(0,a.jsx)(Z.Z,{icon:"tabler:trash"})})})]})}}],rows:v,localeText:{noRowsLabel:"لا توجد بيانات",footerTotalRows:"إجمالي الصفوف:",columnMenuFilter:"منقي",columnMenuHideColumn:"إخفاء العمود",columnMenuManageColumns:"إدارة الأعمدة",columnMenuSortAsc:"الترتيب حسب تصاعدي",columnMenuSortDesc:"الترتيب تنازلياً",footerRowSelected:e=>"".concat(e.toLocaleString()," الصفوف المحددة"),footerTotalVisibleRows:(e,t)=>"".concat(e.toLocaleString()," من ").concat(t.toLocaleString())},pageSizeOptions:[10,20,50],paginationModel:b,onPaginationModelChange:S}),(0,a.jsx)(k,{open:z,categories:s,onSuccess:()=>C(!y),onClose:()=>w(!1)}),(0,a.jsx)(M,{open:A,categories:s,navigation:p,onSuccess:()=>C(!y),onClose:()=>W(!1)}),(0,a.jsx)(I,{open:E,navigation:p,onSuccess:()=>C(!y),onClose:()=>_(!1)})]})};L.getLayout=e=>(0,a.jsx)(j.Z,{children:e}),L.authGuard=!0;var T=L}},function(e){e.O(0,[903,765,774,888,179],function(){return e(e.s=29469)}),_N_E=e.O()}]);