"use strict";(self.webpackChunkashishs_application_1=self.webpackChunkashishs_application_1||[]).push([[207],{8207:(l,e,i)=>{i.r(e),i.d(e,{default:()=>b});var s=i(5188),d=i(7392),t=i(6213),n=i(9e3),o=i(7083),a=i(5395),r=i(6178),c=i.n(r),v=i(5043),u=i(5369),x=i(4556),m=i(3216),h=i(5475),p=(i(7826),i(7330)),j=i(2508),f=i(8557),g=i(579);const b=()=>{var l,e,i,r,b,y,_,N,w,S,F,k,C,A,q,z,D;const{order_id:O}=(0,m.g)(),[W,M]=(0,v.useState)(!1),[B,T]=(0,v.useState)([]),[P,R]=(0,v.useState)([]),[G,I]=(0,v.useState)([]),[L,Y]=(0,v.useState)(!1),[E,$]=(0,v.useState)(),[V,H]=(0,v.useState)({}),[J,Q]=(0,v.useState)({}),U=((0,m.g)(),(0,m.zy)());var Z=U.state?U.state.value:null,K=null===U||void 0===U||null===(l=U.state)||void 0===l?void 0:l.coupon_discount;const X=(0,x.d4)((l=>{var e,i;return null===(e=l.LoginOtpVerifyReducer.verify_result)||void 0===e||null===(i=e.data)||void 0===i?void 0:i.access_token})),ll=(0,x.d4)((l=>{var e,i;return null===(e=l.LoginOtpVerifyReducer.verify_result)||void 0===e||null===(i=e.data)||void 0===i?void 0:i.expires_at})),{warehouseData:el}=(0,x.d4)((l=>null===l||void 0===l?void 0:l.WarehouseReducer)),il="http://allwinmedico.in/ggb-api/public",[sl,dl]=(0,v.useState)(!1),[tl,nl]=(0,v.useState)(!1),[ol,al]=(0,v.useState)(0),rl=(0,m.Zp)(),cl=()=>{setTimeout((()=>{nl(!1),rl("/profile/orders")}),800)};(0,v.useEffect)((()=>{if(void 0===X&&void 0===ll)M(!0);else{const l=Math.floor(Date.now()/1e3);M(ll<l),(async(l,e,i)=>{Y(!0);try{var s,d;const n={headers:{}};e&&(n.headers.Authorization=`Bearer ${e}`);const o=await t.A.get(`${il}/${l}/${i}`,n);T(null===o||void 0===o||null===(s=o.data)||void 0===s?void 0:s.data);let a={save:0,gst:0,total_price:0,mrp:0};a=null===o||void 0===o||null===(d=o.data)||void 0===d?void 0:d.data.reduce(((l,e)=>(l.mrp+=e.unit_mrp*e.quantity||0,l.save+=e.discount||0,l.gst+=(e.total_cgst||0)+(e.total_sgst||0),l.total_price+=e.total_price||0,l)),{save:0,gst:0,total_price:0,mrp:0}),Q(a),Y(!1)}catch(n){console.log(n)}})("api/get-order-dtl",X,O)}}),[W,O]);(0,v.useMemo)((()=>{(async l=>{if(void 0!==l){var e;const i=await(null===el||void 0===el||null===(e=el.data)||void 0===e?void 0:e.find((e=>e.idstore_warehouse===l)));$(i)}})(null===P||void 0===P?void 0:P.idstore_warehouse)}),[null===P||void 0===P?void 0:P.idstore_warehouse]),console.log("storeAddress",E);const vl=(l,e,i,s,d)=>2==l?null===e||void 0===e?void 0:e.toFixed(2):3==l?null===i||void 0===i?void 0:i.toFixed(2):4==l?null===s||void 0===s?void 0:s.toFixed(2):null===d||void 0===d?void 0:d.toFixed(2),ul=l=>2==l?"Wish Basket - Product":3==l?"Wish Basket - land":4==l?"Wish Basket - copartner":"instant discount",xl=(l,e,i,s,d,t)=>2==l?e-i:3==l?e-s:4==l?e-d:e-t,[ml,hl]=(0,v.useState)(Array(null===B||void 0===B?void 0:B.length).fill(null)),[pl,jl]=(0,v.useState)(Array(null===B||void 0===B?void 0:B.length).fill(!1)),[fl,gl]=(0,v.useState)(!1),bl=(l,e)=>c()().diff(c()(l),"days")<e;(0,v.useEffect)((()=>{1==(null===P||void 0===P?void 0:P.idmembership_plan)?al(null===P||void 0===P?void 0:P.total_discount):2==(null===P||void 0===P?void 0:P.idmembership_plan)?al(null===P||void 0===P?void 0:P.product_discount):3==(null===P||void 0===P?void 0:P.idmembership_plan)?al(null===P||void 0===P?void 0:P.land_discount):4==(null===P||void 0===P?void 0:P.idmembership_plan)?al(null===P||void 0===P?void 0:P.copartner_discount):al(0)}),[P]);const yl=(l,e)=>{var i;const s=void 0!==V[l]?V[l]:pl[l]?(null===(i=B[l])||void 0===i?void 0:i.quantity)||1:"";var d;return pl[l]?(0,g.jsx)("input",{type:"number",value:s,onChange:e=>((l,e)=>{var i;e<=0||e>(null===(i=B[l])||void 0===i?void 0:i.quantity)||H((i=>({...i,[l]:e})))})(l,parseInt(e.target.value)),min:"1",max:(null===(d=B[l])||void 0===d?void 0:d.quantity)||"",style:{width:90,height:23}}):null};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o.A,{}),(0,g.jsxs)("main",{className:"main pages order-detail",children:[(0,g.jsx)("div",{className:"container-fluid",children:(0,g.jsx)(j.A,{sublink:"",activepage:"Order Detail"})}),L?(0,g.jsx)(a.a,{}):(0,g.jsx)("div",{className:"container-fluid",children:(0,g.jsxs)("div",{className:"page-content sm:pb-14",style:{minHeight:200,maxWidth:1050,margin:"0px auto"},children:[(0,g.jsx)(h.N_,{className:"sm:hidden",to:"/profile/orders",children:(0,g.jsx)(d.A,{children:(0,g.jsx)(u.Tsg,{style:{color:"black"}})})}),(0,g.jsx)("div",{className:"sm:p-[8px] p-[20px] pt-[10px] mb-9",style:{boxShadow:"0 0 8px 0 rgba(0, 0, 0, 0.1)"},children:(0,g.jsxs)("div",{className:"pb-3",children:[(0,g.jsxs)("div",{className:"flex justify-start  items-start flex-col border-bottom-1",children:[(0,g.jsxs)("div",{className:"flex justify-between w-full sm:pb-[0] pt-2 pb-3",children:[(0,g.jsx)("span",{className:"rigth-text-modal sm:text-xs text-sm font-medium",children:(0,g.jsxs)("b",{children:["Order Id : GGB000",B&&(null===(e=B[0])||void 0===e?void 0:e.idcustomer_order)]})}),(0,g.jsx)("span",{className:"rigth-text-modal sm:text-xs text-sm font-medium",children:(0,g.jsxs)("b",{children:["Order Date : ",(0,f.Vn)({text:Z})]})})]}),(0,g.jsx)("div",{className:"flex justify-start  items-start flex-col border-bottom-1 w-full",children:(0,g.jsxs)("div",{className:"w-full",children:[(null===P||void 0===P?void 0:P.name)&&(0,g.jsxs)("div",{className:"flex justify-between w-full mt-1 hover:bg-gray-100",children:[(0,g.jsx)("span",{className:"left-text-modal",children:"Name"}),(0,g.jsx)("span",{className:"rigth-text-modal",children:null===P||void 0===P?void 0:P.name})]}),(null===P||void 0===P?void 0:P.email)&&(0,g.jsxs)("div",{className:"flex justify-between w-full mt-1 hover:bg-gray-100",children:[(0,g.jsx)("span",{className:"left-text-modal",children:"Email"}),(0,g.jsx)("span",{className:"rigth-text-modal",children:null===P||void 0===P?void 0:P.email})]}),(null===P||void 0===P?void 0:P.contact)&&(0,g.jsxs)("div",{className:"flex justify-between w-full mt-1 hover:bg-gray-100",children:[(0,g.jsx)("span",{className:"left-text-modal",children:"Contact No"}),(0,g.jsx)("span",{className:"rigth-text-modal",children:null===P||void 0===P?void 0:P.contact})]}),(null===P||void 0===P?void 0:P.address)&&(0,g.jsxs)("div",{className:"flex justify-between w-full mt-1 hover:bg-gray-100",children:[(0,g.jsx)("span",{className:"left-text-modal",children:"Address"}),(0,g.jsx)("span",{className:"rigth-text-modal",children:null===P||void 0===P?void 0:P.address})]})]})}),(0,g.jsx)("div",{className:"sm:overflow-y-auto md:overflow-y-auto max-w-full w-full",children:(0,g.jsx)("div",{className:"min-w-[730px]",children:(0,g.jsxs)("table",{className:"mb-0 product-detail-table w-full",children:[(0,g.jsx)("thead",{children:(0,g.jsxs)("tr",{children:[(0,g.jsx)("th",{className:"text-center",children:(()=>{const l=null===B||void 0===B?void 0:B.filter((l=>"Y"===(null===l||void 0===l?void 0:l.has_return_rule)&&bl(null===l||void 0===l?void 0:l.created_at,null===l||void 0===l?void 0:l.return_duration)&&1===(null===l||void 0===l?void 0:l.status)));return(null===l||void 0===l?void 0:l.length)>0})()?(0,g.jsx)(g.Fragment,{}):(0,g.jsx)("input",{className:"opacity-0 cursor-not-allowed bg-slate-400",type:"checkbox",disabled:!0})}),(0,g.jsx)("th",{children:"Product Detail"}),(0,g.jsx)("th",{children:"GST (Rs)"}),(0,g.jsx)("th",{children:"You Save (Rs / PR)"}),(0,g.jsx)("th",{children:"You Pay (Rs)"})]})}),(0,g.jsxs)("tbody",{children:[B?null===B||void 0===B?void 0:B.map(((l,e)=>{var i,s,d,t,o,a,r,c,v,u,x,m,h,p,j;return(0,g.jsxs)("tr",{style:{padding:5,opacity:0===(null===l||void 0===l?void 0:l.status)?.5:1,cursor:0===(null===l||void 0===l?void 0:l.status)?"not-allowed":"default"},children:[(0,g.jsx)("td",{className:"text-center",children:(0,g.jsx)(g.Fragment,{})}),(0,g.jsx)("td",{children:(0,g.jsxs)("div",{className:"flex items-center gap-3",children:[(0,g.jsx)("div",{style:{width:65,height:65},children:(0,g.jsx)(n.E9,{className:"default-img",src:"http://allwinmedico.in/ggb-api/public/products/"+l.barcode+".jpg",alt:null===l||void 0===l?void 0:l.description,style:{width:"100%",height:"100%"}})}),(0,g.jsxs)("div",{children:[(0,g.jsx)("span",{style:{fontSize:14},children:(null===l||void 0===l||null===(i=l.prod_name)||void 0===i?void 0:i.length)>24?(null===l||void 0===l||null===(s=l.prod_name)||void 0===s?void 0:s.slice(0,24))+"...":null===l||void 0===l?void 0:l.prod_name}),(0,g.jsxs)("div",{style:{fontSize:"14px",color:"rgb(126, 123, 123)",display:"flex",gap:3},children:["Quantity:\xa0","Y"===(null===l||void 0===l?void 0:l.has_return_rule)&&bl(null===l||void 0===l?void 0:l.created_at,null===l||void 0===l?void 0:l.return_duration)?(0,g.jsx)(g.Fragment,{children:yl(e,null===l||void 0===l||l.quantity)?yl(e,null===l||void 0===l||l.quantity):null===l||void 0===l?void 0:l.quantity}):null===l||void 0===l?void 0:l.quantity]}),(null===l||void 0===l?void 0:l.unit_mrp.toFixed(2))===vl(null===P||void 0===P?void 0:P.idmembership_plan,null===l||void 0===l?void 0:l.product_discount,null===l||void 0===l?void 0:l.land_discount,null===l||void 0===l?void 0:l.copartner_discount,null===l||void 0===l?void 0:l.unit_selling_price)?(0,g.jsxs)("div",{className:"flex items-center",style:{gap:10},children:[(0,g.jsxs)("span",{style:{fontSize:"14px",color:"black"},children:["\u20b9",null===l||void 0===l||null===(d=l.unit_mrp)||void 0===d?void 0:d.toFixed(2)]}),(0,g.jsx)("div",{className:"discount-label-warapper",children:(0,g.jsx)("div",{className:"dicount-label t491",children:ul(null===P||void 0===P?void 0:P.idmembership_plan)})})]}):(0,g.jsxs)("div",{className:"flex items-center",style:{gap:10},children:[(0,g.jsxs)("span",{style:{fontSize:"14px",color:"rgb(126, 123, 123)",textDecoration:"line-through"},children:["\u20b9",null===l||void 0===l||null===(t=l.unit_mrp)||void 0===t?void 0:t.toFixed(2)]}),(0,g.jsxs)("div",{className:"discount-label-warapper",children:[(0,g.jsxs)("span",{style:{fontSize:"14px",color:"black"},children:["\u20b9",vl(null===P||void 0===P?void 0:P.idmembership_plan,null===l||void 0===l?void 0:l.product_discount,null===l||void 0===l?void 0:l.land_discount,null===l||void 0===l?void 0:l.copartner_discount,null===l||void 0===l?void 0:l.unit_selling_price)]}),(0,g.jsx)("div",{className:"dicount-label t529",children:ul(null===P||void 0===P?void 0:P.idmembership_plan)})]})]})]})]})}),(0,g.jsx)("td",{children:(0,g.jsxs)("div",{className:"flex  flex-col w-[120px] gap-[5px]",children:[(0,g.jsxs)("span",{style:{fontSize:"12px",color:"rgb(126, 123, 123)"},children:["CGST:\xa0\u20b9",null===l||void 0===l||null===(o=l.total_cgst)||void 0===o?void 0:o.toFixed(2)]}),(0,g.jsxs)("span",{style:{fontSize:"12px",color:"rgb(126, 123, 123)"},children:["SGST:\xa0\u20b9",null===l||void 0===l||null===(a=l.total_sgst)||void 0===a?void 0:a.toFixed(2)]})]})}),(0,g.jsx)("td",{children:0===xl(null===P||void 0===P?void 0:P.idmembership_plan,null===l||void 0===l?void 0:l.unit_mrp,null===l||void 0===l?void 0:l.product_discount,null===l||void 0===l?void 0:l.land_discount,null===l||void 0===l?void 0:l.copartner_discount,null===l||void 0===l?void 0:l.unit_selling_price)?(0,g.jsx)("div",{className:"11sm:col-span-6 col-span-3 sm:pt-2",children:(0,g.jsx)("div",{style:{width:150,gap:5},className:"flex items-center sm:text-xs text-base",children:(0,g.jsx)("b",{children:"No Discount"})})}):(0,g.jsx)("div",{className:"11sm:col-span-6 col-span-3 sm:pt-2",children:(0,g.jsxs)("div",{style:{width:150,gap:5},className:"flex items-center sm:text-xs text-[14px]",children:[(0,g.jsxs)("b",{children:[" ","\u20b9",xl(null===P||void 0===P?void 0:P.idmembership_plan,null===l||void 0===l?void 0:l.unit_mrp,null===l||void 0===l?void 0:l.product_discount,null===l||void 0===l?void 0:l.land_discount,null===l||void 0===l?void 0:l.copartner_discount,null===l||void 0===l?void 0:l.unit_selling_price).toFixed(2)]}),(0,g.jsx)("b",{children:"\xd7"}),(0,g.jsx)("b",{children:null===l||void 0===l?void 0:l.quantity}),(0,g.jsx)("b",{children:"="}),(0,g.jsx)("b",{children:(xl(null===P||void 0===P?void 0:P.idmembership_plan,null===l||void 0===l?void 0:l.unit_mrp,null===l||void 0===l?void 0:l.product_discount,null===l||void 0===l?void 0:l.land_discount,null===l||void 0===l?void 0:l.copartner_discount,null===l||void 0===l?void 0:l.unit_selling_price)*(null===l||void 0===l?void 0:l.quantity)).toFixed(2)}),"("," ",(0,g.jsxs)("b",{children:[" ",(u=null===P||void 0===P?void 0:P.idmembership_plan,x=null===l||void 0===l?void 0:l.unit_mrp,m=null===l||void 0===l?void 0:l.product_discount,h=null===l||void 0===l?void 0:l.land_discount,p=null===l||void 0===l?void 0:l.copartner_discount,j=null===l||void 0===l?void 0:l.unit_selling_price,2==u?Math.round((x-m)/x*100):3==u?Math.round((x-h)/x*100):4==u?Math.round((x-p)/x*100):Math.round((x-j)/x*100)),"%"]}),")"]})})}),(0,g.jsx)("td",{children:(0,g.jsxs)("div",{className:"11sm:col-span-6 col-span-2 sm:pt-2",children:[1==(null===P||void 0===P?void 0:P.idmembership_plan)?(0,g.jsxs)("div",{style:{width:150,gap:5},className:"flex items-center sm:text-xs text-[14px]",children:[(0,g.jsx)("b",{children:null===l||void 0===l||null===(r=l.unit_selling_price)||void 0===r?void 0:r.toFixed(2)}),(0,g.jsx)("b",{children:"\xd7"}),(0,g.jsx)("b",{children:null===l||void 0===l?void 0:l.quantity}),(0,g.jsx)("b",{children:"="}),(0,g.jsx)("b",{children:null===l||void 0===l||null===(c=l.total_price)||void 0===c?void 0:c.toFixed(2)})]}):(0,g.jsxs)("div",{style:{width:150,gap:5},className:"flex items-center sm:text-xs text-[14px]",children:[(0,g.jsx)("b",{children:vl(null===P||void 0===P?void 0:P.idmembership_plan,null===l||void 0===l?void 0:l.product_discount,null===l||void 0===l?void 0:l.land_discount,null===l||void 0===l?void 0:l.copartner_discount,null===l||void 0===l?void 0:l.unit_selling_price)}),(0,g.jsx)("b",{children:"\xd7"}),(0,g.jsx)("b",{children:null===l||void 0===l?void 0:l.quantity}),(0,g.jsx)("b",{children:"="}),(0,g.jsx)("b",{children:null===l||void 0===l||null===(v=l.total_price)||void 0===v?void 0:v.toFixed(2)})]}),0===(null===l||void 0===l?void 0:l.status)&&(0,g.jsx)("div",{style:{marginTop:"0.5rem",color:"red"},children:null===l||void 0===l?void 0:l.remark})]})})]})})):null,(0,g.jsxs)("tr",{children:[(0,g.jsx)("td",{}),(0,g.jsx)("td",{}),(0,g.jsxs)("td",{style:{color:"rgb(126, 123, 123)"},children:[JSON.stringify(),"\u20b9",null===(i=J.gst)||void 0===i?void 0:i.toFixed(2)]}),(0,g.jsx)("td",{children:(0,g.jsxs)("b",{children:["\u20b9",null===(r=J.save)||void 0===r?void 0:r.toFixed(2)]})}),(0,g.jsx)("td",{children:(0,g.jsxs)("b",{children:["\u20b9",null===J||void 0===J||null===(b=J.total_price)||void 0===b?void 0:b.toFixed(2)]})})]}),B&&(0,g.jsx)("tr",{children:(0,g.jsx)("td",{colSpan:5,children:(0,g.jsxs)("div",{className:"flex justify-between items-center gap-2 w-full",children:[(0,g.jsxs)("div",{className:"flex items-center gap-2",children:[(0,g.jsx)("span",{className:"left-text-modal font-[20px]",children:B.length}),(0,g.jsx)("span",{className:"rigth-text-modal  font-[20px]",children:"Items in this order"})]}),(0,g.jsx)("div",{children:(0,g.jsx)(g.Fragment,{})})]})})})]})]})})})]}),(0,g.jsxs)("div",{className:"flex justify-start  items-start flex-col border-bottom-1 w-full",children:[(0,g.jsx)("div",{className:"order-title",children:"Bill Details"}),(0,g.jsxs)("div",{className:"flex justify-between w-full mt-1 hover:bg-gray-100",children:[(0,g.jsx)("span",{className:"left-text-modal",children:"Item mrp(Base)"}),(0,g.jsx)("span",{className:"rigth-text-modal",children:(0,g.jsxs)("b",{className:"my-aviClass",children:[" \u20b9 ",null===J||void 0===J||null===(y=J.mrp)||void 0===y?void 0:y.toFixed(2)," "]})})]}),(0,g.jsxs)("div",{className:"flex justify-between w-full mt-1 hover:bg-gray-100",children:[(0,g.jsx)("span",{className:"left-text-modal",children:"Coupon discount"}),(0,g.jsx)("span",{className:"rigth-text-modal",children:(0,g.jsxs)("b",{className:"my-aviClass",children:[" \u20b9 ",null===K||void 0===K?void 0:K.toFixed(2)," "]})})]}),(0,g.jsxs)("div",{className:"flex justify-between w-full mt-1 hover:bg-gray-100",children:[(0,g.jsx)("span",{className:"left-text-modal",children:"Flat & Package Discount"}),(0,g.jsx)("span",{className:"rigth-text-modal",children:(0,g.jsxs)("b",{className:"my-aviClass",children:["\u20b9 ",null===J||void 0===J||null===(_=J.save)||void 0===_?void 0:_.toFixed(2)," "]})})]}),(0,g.jsxs)("div",{className:"flex justify-between w-full mt-1 hover:bg-gray-100",children:[(0,g.jsx)("span",{className:"left-text-modal",children:"Cashback in Wallet"}),(0,g.jsx)("span",{className:"rigth-text-modal",children:(0,g.jsxs)("b",{className:"my-aviClass",children:[" \u20b9",null===U||void 0===U||null===(N=U.state)||void 0===N||null===(w=N.CashbackinWallet)||void 0===w?void 0:w.toFixed(2)," "]})})]}),(0,g.jsxs)("div",{className:"flex justify-between w-full mt-1 hover:bg-gray-100",children:[(0,g.jsx)("span",{className:"left-text-modal",children:"Membership Name"}),(0,g.jsx)("span",{className:"rigth-text-modal",children:ul(null===U||void 0===U||null===(S=U.state)||void 0===S?void 0:S.idmembership_plan)})]}),(0,g.jsxs)("div",{className:"flex justify-between w-full mt-1 hover:bg-gray-100",children:[(0,g.jsx)("span",{className:"left-text-modal",style:{fontWeight:"bold",color:"rgb(49, 134, 22)"},children:"Bill Total"}),(0,g.jsxs)("span",{className:"rigth-text-modal",style:{fontWeight:"bold",color:"rgb(49, 134, 22)"},children:["\u20b9",null===U||void 0===U||null===(F=U.state)||void 0===F||null===(k=F.total_price)||void 0===k?void 0:k.toFixed(2)]})]})]}),(0,g.jsx)("div",{className:"flex justify-start  items-start flex-col mt-2 ",children:(0,g.jsxs)("div",{className:"w-full",children:[(0,g.jsx)("div",{className:"flex justify-between w-full mt-1 hover:bg-gray-100"}),(0,g.jsxs)("div",{className:"flex justify-between w-full mt-1 hover:bg-gray-100",children:[(0,g.jsx)("span",{className:"left-text-modal",children:"Payment Mode"}),(0,g.jsxs)("span",{className:"rigth-text-modal",children:["Paid by ",(null===U||void 0===U||null===(C=U.state)||void 0===C||null===(A=C.pay_mode)||void 0===A?void 0:A.charAt(0).toUpperCase())+(null===U||void 0===U||null===(q=U.state)||void 0===q||null===(z=q.pay_mode)||void 0===z?void 0:z.slice(1).toLowerCase())]})]}),(0,g.jsxs)("div",{className:"flex justify-between w-full mt-1 hover:bg-gray-100",children:[(0,g.jsx)("span",{className:"left-text-modal",children:"Deliver To"}),(0,g.jsx)("span",{className:"rigth-text-modal",children:(0,g.jsx)("div",{className:"w-full",children:(0,g.jsx)("div",{className:"flex justify-between w-full mt-1 hover:bg-gray-100",children:(0,g.jsx)("span",{className:"rigth-text-modal",children:null===U||void 0===U||null===(D=U.state)||void 0===D?void 0:D.address})})})})]})]})})]})})]})})]}),(0,g.jsx)(p.A,{isOpen:tl,onClose:cl,children:(0,g.jsx)("div",{style:{width:400,minHeight:120,maxWidth:"100%"},children:(0,g.jsxs)("div",{className:"pt-3",children:[(0,g.jsxs)("div",{className:"flex flex-col items-center",children:[(0,g.jsx)(s.A,{style:{fontSize:115,color:"rgb(12, 131, 31)"}}),(0,g.jsx)("p",{className:"text-md text-center",children:"Your Item successfully canceled"})]}),(0,g.jsx)("div",{className:"flex items-center justify-end gap-2 mt-3",children:(0,g.jsx)("button",{className:"button-upgrade flex items-center justify-center",onClick:cl,children:"Ok"})})]})})})]})}},5188:(l,e,i)=>{var s=i(4994);e.A=void 0;var d=s(i(39)),t=i(579);e.A=(0,d.default)((0,t.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"}),"CheckCircleOutlineOutlined")},7826:()=>{}}]);
//# sourceMappingURL=207.35d92b4f.chunk.js.map