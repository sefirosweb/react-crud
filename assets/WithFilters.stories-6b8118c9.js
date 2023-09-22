import{j as t}from"./ThemeProvider-09f3a863.js";import{r as n}from"./index-76fb7be0.js";import{C as f}from"./index-983f9833.js";import{F as a}from"./index-1716dfda.js";import{d as S}from"./Product-d3a41160.js";import{F as T}from"./FormTypeSelect-3634e20f.js";import{D as s}from"./index-2ce11de6.js";import"./_commonjsHelpers-de833af9.js";import"./index-23b5c7fd.js";import"./index.esm-a45aa266.js";import"./Button-880d3194.js";import"./Button-ad68e730.js";import"./useTranslation-7232bec6.js";import"./i18nInstance-1f8a4d28.js";import"./Row-5355c8a4.js";import"./Form-c707cc1e.js";import"./index-8d47fad6.js";import"./createWithBsPrefix-2998513f.js";import"./index-0c2e141e.js";import"./index-c93e2f2e.js";import"./LoadingButton-41bc35b5.js";import"./LoadingSpinner-7d259415.js";import"./useEventCallback-c7177fdc.js";import"./index-d3ea75b5.js";import"./inheritsLoose-c82a83d4.js";import"./index-64b682ff.js";import"./index-21433751.js";import"./matchStrings-5a558dd8.js";import"./useGetQueryClient-5c6c423d.js";import"./axios-503983f7.js";import"./index-862e6100.js";import"./index-e3f1c84d.js";import"./index-560bdad7.js";import"./FormTypeDate-430a9028.js";import"./FormTypeHtml-e189c7f9.js";import"./FormTypeNumber-bca85b35.js";import"./FormTypePassword-157ba307.js";import"./FormTypeText-940786e9.js";import"./FormTypeTextArea-c7676ee8.js";import"./index-20a54978.js";import"./i18n-9fd04d21.js";const{useEffect:y}=__STORYBOOK_MODULE_ADDONS__,pe={title:"Tables/Crud",component:f},_=[{accessorKey:"uuid",enableColumnFilter:!0,enableSorting:!0,dropdown:!0},{accessorKey:"ean"},{accessorKey:"name",header:"Edad"},{accessorKey:"description",header:"Desc.",enableColumnFilter:!0},{accessorKey:"price",enableColumnFilter:!0,fieldType:a.NUMBER},{accessorKey:"category_id",header:"Cat.",cell:e=>e.row.original.category,enableColumnFilter:!0,fieldType:a.SELECT,selectOptionsUrl:"/api/get_options",visible:!1},{header:"Date",accessorFn:e=>s.fromISO(e.created_at).toMillis(),enableColumnFilter:!0,enableSorting:!0,fieldType:a.DATE,cell:e=>s.fromISO(e.row.original.created_at).toISODate()+" => "+s.fromISO(e.row.original.created_at).toMillis()}],r={args:{columns:_,data:S,enableGlobalFilter:!0},render:e=>{const[g,h]=n.useState(""),l=n.useRef(!1);y(()=>(l.current=!0,()=>{l.current=!1}),[]);const b=i=>{var c,u;h(i.target.value);const F=[{id:"category_id",value:i.target.value}];(c=o.current)!=null&&c.table&&((u=o.current)==null||u.table.setColumnFilters(F))},C=t.jsx(t.Fragment,{children:t.jsx(T,{handleChange:b,controlId:"Test change",name:"Test change",selectOptionsUrl:"/api/get_options",value:g,label:"This is a external filter"})}),o=n.useRef(null);return t.jsx(f,{...e,customButtons:C,ref:o})}};var m,p,d;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(d=(p=r.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const de=["WithFilters"];export{r as WithFilters,de as __namedExportsOrder,pe as default};
//# sourceMappingURL=WithFilters.stories-6b8118c9.js.map
