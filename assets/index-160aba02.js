var R=(a,e,t)=>{if(!e.has(a))throw TypeError("Cannot "+t)};var r=(a,e,t)=>(R(a,e,"read from private field"),t?t.call(a):e.get(a)),C=(a,e,t)=>{if(e.has(a))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(a):e.set(a,t)},q=(a,e,t,s)=>(R(a,e,"write to private field"),s?s.call(a,t):e.set(a,t),t);var I=(a,e,t)=>(R(a,e,"access private method"),t);import{j as f}from"./ThemeProvider-09f3a863.js";import{r as d}from"./index-76fb7be0.js";import{T as ae}from"./index-c239b66d.js";import{I as se}from"./index-192def1a.js";import{D as re}from"./index-862e6100.js";import{a as U}from"./axios-7460e05c.js";import{S as ne,s as ie,b as ue,n as B,c as G,d as le,a as oe,u as de,Q as ce}from"./useGetQueryClient-7a930f35.js";import{u as pe}from"./useTranslation-7232bec6.js";var g,o,c,h,D,E,v,P,N,me=(N=class extends ne{constructor(e,t){super();C(this,D);C(this,v);C(this,g,void 0);C(this,o,void 0);C(this,c,void 0);C(this,h,void 0);q(this,o,void 0),q(this,g,e),this.setOptions(t),this.bindMethods(),I(this,D,E).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){var s;const t=this.options;this.options=r(this,g).defaultMutationOptions(e),ie(t,this.options)||r(this,g).getMutationCache().notify({type:"observerOptionsUpdated",mutation:r(this,c),observer:this}),(s=r(this,c))==null||s.setOptions(this.options)}onUnsubscribe(){var e;this.hasListeners()||(e=r(this,c))==null||e.removeObserver(this)}onMutationUpdate(e){I(this,D,E).call(this),I(this,v,P).call(this,e)}getCurrentResult(){return r(this,o)}reset(){q(this,c,void 0),I(this,D,E).call(this),I(this,v,P).call(this)}mutate(e,t){var s;return q(this,h,t),(s=r(this,c))==null||s.removeObserver(this),q(this,c,r(this,g).getMutationCache().build(r(this,g),this.options)),r(this,c).addObserver(this),r(this,c).execute(e)}},g=new WeakMap,o=new WeakMap,c=new WeakMap,h=new WeakMap,D=new WeakSet,E=function(){var t;const e=((t=r(this,c))==null?void 0:t.state)??ue();q(this,o,{...e,isPending:e.status==="pending",isSuccess:e.status==="success",isError:e.status==="error",isIdle:e.status==="idle",mutate:this.mutate,reset:this.reset})},v=new WeakSet,P=function(e){B.batch(()=>{var t,s,l,n,i,y,p,M;r(this,h)&&this.hasListeners()&&((e==null?void 0:e.type)==="success"?((s=(t=r(this,h)).onSuccess)==null||s.call(t,e.data,r(this,o).variables,r(this,o).context),(n=(l=r(this,h)).onSettled)==null||n.call(l,e.data,null,r(this,o).variables,r(this,o).context)):(e==null?void 0:e.type)==="error"&&((y=(i=r(this,h)).onError)==null||y.call(i,e.error,r(this,o).variables,r(this,o).context),(M=(p=r(this,h)).onSettled)==null||M.call(p,void 0,e.error,r(this,o).variables,r(this,o).context))),this.listeners.forEach(L=>{L(r(this,o))})})},N);function he(a,e){const t=G(e),[s]=d.useState(()=>new me(t,a));d.useEffect(()=>{s.setOptions(a)},[s,a]);const l=d.useSyncExternalStore(d.useCallback(i=>s.subscribe(B.batchCalls(i)),[s]),()=>s.getCurrentResult(),()=>s.getCurrentResult()),n=d.useCallback((i,y)=>{s.mutate(i,y).catch(fe)},[s]);if(l.error&&le(s.options.throwOnError,[l.error]))throw l.error;return{...l,mutate:n,mutateAsync:l.mutate}}function fe(){}const ye=a=>{const{crud:e,dataToSend:t,url:s}=a;return new Promise((l,n)=>{switch(e){case"CREATE":U.post(s,t).then(i=>{if(i.data.success!==!0)return n("The response dosen't response success");l(i.data)}).catch(n);break;case"DELETE":U.delete(s,{data:t}).then(i=>{if(i.data.success!==!0)return n("The response dosen't response success");l(i.data)}).catch(n);break}})},ge=(a,e)=>new Promise((t,s)=>{if(!a){t(null);return}U.get(a,{params:e}).then(l=>t(l.data)).catch(s)}),be=d.forwardRef((a,e)=>{const{autoSave:t=!0,label:s,sentKeyAs:l,primaryKey:n,primaryKeyId:i,sentPrimaryKeyIdAs:y="primaryKeyId",crudUrl:p="",columns:M,getDataUrl:L,lazyLoad:H,handleIsLoading:T,handleChange:Q}=a,j=l??n,W=t?H:!1,[x,$]=d.useState(!1),[b,V]=d.useState([]),A=d.useRef(null),z=[...M],J=G(),{t:X}=pe(),{data:K,isRefetching:O,isLoading:_}=oe({queryKey:[p,i],queryFn:()=>ge(p,{[y]:i}),refetchOnReconnect:!1,refetchOnWindowFocus:!1}),{mutate:k,isPending:w}=he({mutationFn:ye,onSettled:u=>{var m;u.success&&(J.invalidateQueries({queryKey:[p,i]}),(m=A.current)==null||m.clear())}});d.useEffect(()=>{$(O||w||_),T&&T(O||w||_)},[O,w,_,T]),d.useEffect(()=>{if(!K)return;const u=K.data;K.success&&V(u)},[K,V]),d.useEffect(()=>{Q&&Q(b)},[b]),z.push({header:X("Delete"),id:"delete_crud",cell:u=>f.jsx(re,{disabled:x,onClick:()=>Y(u.row.original)})});const Y=u=>{if(t){if(!p)return;const m={...u,[j]:u[n],[y]:i};k({crud:"DELETE",url:p,dataToSend:m})}else{const m=b.filter(S=>S[n]!==u[n]);V(m)}},Z=u=>{var m;if(t){if(!p)return;const S={...u,[j]:u[n],[y]:i};k({crud:"CREATE",url:p,dataToSend:S})}else{const S=[...b],ee=S.findIndex(te=>te[n]===u[n]);if((m=A.current)==null||m.clear(),ee>=0)return;S.push(u),V(S)}};return d.useImperativeHandle(e,()=>({getIds(){return b.map(u=>u[n])},getTableData(){return b}})),f.jsxs(f.Fragment,{children:[f.jsx(se,{label:s,ref:A,url:L,lazyLoad:W,onAcceptButton:Z,isLoading:x}),f.jsx(ae,{className:"mt-2",columns:z,data:b,isLoading:x})]})}),F=d.forwardRef((a,e)=>{const t=de();return f.jsx(f.Fragment,{children:f.jsx(ce,{client:t,children:f.jsx(be,{...a,ref:e})})})});try{F.displayName="MultiSelectCrudTable",F.__docgenInfo={description:"",displayName:"MultiSelectCrudTable",props:{label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},sentKeyAs:{defaultValue:null,description:"",name:"sentKeyAs",required:!1,type:{name:"string"}},primaryKey:{defaultValue:null,description:"",name:"primaryKey",required:!0,type:{name:"string"}},primaryKeyId:{defaultValue:null,description:"",name:"primaryKeyId",required:!0,type:{name:"string"}},sentPrimaryKeyIdAs:{defaultValue:null,description:"",name:"sentPrimaryKeyIdAs",required:!1,type:{name:"string"}},crudUrl:{defaultValue:null,description:"",name:"crudUrl",required:!1,type:{name:"string"}},getDataUrl:{defaultValue:null,description:"",name:"getDataUrl",required:!0,type:{name:"string"}},lazyLoad:{defaultValue:null,description:"",name:"lazyLoad",required:!1,type:{name:"boolean"}},autoSave:{defaultValue:null,description:"",name:"autoSave",required:!1,type:{name:"boolean"}},columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"ColumnDefinition<any>[]"}},handleIsLoading:{defaultValue:null,description:"",name:"handleIsLoading",required:!1,type:{name:"Dispatch<SetStateAction<boolean>>"}},handleChange:{defaultValue:null,description:"",name:"handleChange",required:!1,type:{name:"((dataModal: DataField[]) => void)"}}}}}catch{}try{MultiSelectCrudTable.displayName="MultiSelectCrudTable",MultiSelectCrudTable.__docgenInfo={description:"",displayName:"MultiSelectCrudTable",props:{label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},sentKeyAs:{defaultValue:null,description:"",name:"sentKeyAs",required:!1,type:{name:"string"}},primaryKey:{defaultValue:null,description:"",name:"primaryKey",required:!0,type:{name:"string"}},primaryKeyId:{defaultValue:null,description:"",name:"primaryKeyId",required:!0,type:{name:"string"}},sentPrimaryKeyIdAs:{defaultValue:null,description:"",name:"sentPrimaryKeyIdAs",required:!1,type:{name:"string"}},crudUrl:{defaultValue:null,description:"",name:"crudUrl",required:!1,type:{name:"string"}},getDataUrl:{defaultValue:null,description:"",name:"getDataUrl",required:!0,type:{name:"string"}},lazyLoad:{defaultValue:null,description:"",name:"lazyLoad",required:!1,type:{name:"boolean"}},autoSave:{defaultValue:null,description:"",name:"autoSave",required:!1,type:{name:"boolean"}},columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"ColumnDefinition<any>[]"}},handleIsLoading:{defaultValue:null,description:"",name:"handleIsLoading",required:!1,type:{name:"Dispatch<SetStateAction<boolean>>"}},handleChange:{defaultValue:null,description:"",name:"handleChange",required:!1,type:{name:"((dataModal: DataField[]) => void)"}}}}}catch{}export{F as M,he as u};
//# sourceMappingURL=index-160aba02.js.map