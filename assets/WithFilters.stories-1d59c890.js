import{j as t}from"./ThemeProvider-a71a5aa9.js";import{r as n}from"./index-61bf1805.js";import{C as f}from"./index-72b5c227.js";import{F as a}from"./index-11f483a8.js";import{d as S}from"./Product-69f4182a.js";import{F as T}from"./FormTypeSelect-a02290b5.js";import{D as s}from"./index-763d01f2.js";import"./_commonjsHelpers-de833af9.js";import"./index-249823ed.js";import"./index.esm-1806526e.js";import"./Button-97fb7a83.js";import"./Button-aac535fb.js";import"./useTranslation-9aad8729.js";import"./i18nInstance-1f8a4d28.js";import"./Row-b5cb55df.js";import"./Form-6057eae6.js";import"./index-8d47fad6.js";import"./createWithBsPrefix-e4b19ea9.js";import"./index-b11ed130.js";import"./index-086f44c1.js";import"./LoadingButton-5a00958f.js";import"./LoadingSpinner-ee85fb67.js";import"./useEventCallback-2ca67dcc.js";import"./index-2801d3c9.js";import"./inheritsLoose-c82a83d4.js";import"./index-2675dd19.js";import"./FormTypeDate-ad6bce75.js";import"./FormTypeHtml-bc29b9bd.js";import"./FormTypeNumber-343302cd.js";import"./FormTypePassword-3ad9ea3e.js";import"./FormTypeText-37a0c392.js";import"./FormTypeTextArea-3b3f545c.js";import"./index-1406dde3.js";import"./index-8b309e46.js";import"./matchStrings-5a558dd8.js";import"./useGetQueryClient-cbcca069.js";import"./axios-94372f69.js";import"./index-5be08948.js";import"./index-3fa57039.js";import"./index-b9cefe9f.js";import"./index-3c2a34dd.js";import"./i18n-2050a10d.js";const{useEffect:y}=__STORYBOOK_MODULE_ADDONS__,de={title:"Tables/Crud",component:f},_=[{accessorKey:"uuid",enableColumnFilter:!0,enableSorting:!0,dropdown:!0},{accessorKey:"ean"},{accessorKey:"name",header:"Edad"},{accessorKey:"description",header:"Desc.",enableColumnFilter:!0},{accessorKey:"price",enableColumnFilter:!0,fieldType:a.NUMBER},{accessorKey:"category_id",header:"Cat.",cell:e=>e.row.original.category,enableColumnFilter:!0,fieldType:a.SELECT,selectOptionsUrl:"/api/get_options",visible:!1},{header:"Date",accessorFn:e=>s.fromISO(e.created_at).toMillis(),enableColumnFilter:!0,enableSorting:!0,fieldType:a.DATE,cell:e=>s.fromISO(e.row.original.created_at).toISODate()+" => "+s.fromISO(e.row.original.created_at).toMillis()}],r={args:{columns:_,data:S,enableGlobalFilter:!0},render:e=>{const[g,h]=n.useState(""),l=n.useRef(!1);y(()=>(l.current=!0,()=>{l.current=!1}),[]);const b=i=>{var c,u;h(i.target.value);const F=[{id:"category_id",value:i.target.value}];(c=o.current)!=null&&c.table&&((u=o.current)==null||u.table.setColumnFilters(F))},C=t.jsx(t.Fragment,{children:t.jsx(T,{handleChange:b,controlId:"Test change",name:"Test change",selectOptionsUrl:"/api/get_options",value:g,label:"This is a external filter"})}),o=n.useRef(null);return t.jsx(f,{...e,customButtons:C,ref:o})}};var m,p,d;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    columns: columns,
    data: data,
    enableGlobalFilter: true
  },
  render: props => {
    const [selectedValue, setSelectedValue] = useState("");
    const mounted = useRef(false);
    useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(e.target.value);
      const updateData: ColumnFilter = {
        id: "category_id",
        // must be exist key
        value: e.target.value
      };
      const upd: ColumnFiltersState = [updateData];
      if (crudRef.current?.table) {
        crudRef.current?.table.setColumnFilters(upd);
      }
    };
    const customButtons = <>
        <FormTypeSelect handleChange={handleChange} controlId="Test change" name="Test change" selectOptionsUrl={"/api/get_options"} value={selectedValue} label={"This is a external filter"} />
      </>;
    const crudRef = useRef<PropsRef>(null);
    return <Crud {...props} customButtons={customButtons} ref={crudRef} />;
  }
}`,...(d=(p=r.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const fe=["WithFilters"];export{r as WithFilters,fe as __namedExportsOrder,de as default};
//# sourceMappingURL=WithFilters.stories-1d59c890.js.map
