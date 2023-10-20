import{j as t}from"./ThemeProvider-09f3a863.js";import{r as n}from"./index-76fb7be0.js";import{C as f}from"./index-7221261e.js";import{F as a}from"./index-880ae827.js";import{d as S}from"./Product-eb6928ef.js";import{F as T}from"./FormTypeSelect-0faa0588.js";import{D as s}from"./index-c239b66d.js";import"./_commonjsHelpers-de833af9.js";import"./useGetQueryClient-7a930f35.js";import"./axios-7460e05c.js";import"./index-23b5c7fd.js";import"./index.esm-a45aa266.js";import"./Button-880d3194.js";import"./Button-ad68e730.js";import"./useTranslation-7232bec6.js";import"./i18nInstance-1f8a4d28.js";import"./Row-5355c8a4.js";import"./Form-0553c23f.js";import"./index-8d47fad6.js";import"./index-e66407bd.js";import"./index-d14a5900.js";import"./LoadingButton-41bc35b5.js";import"./LoadingSpinner-7d259415.js";import"./useEventCallback-c7177fdc.js";import"./index-d3ea75b5.js";import"./inheritsLoose-c82a83d4.js";import"./index-160aba02.js";import"./index-192def1a.js";import"./matchStrings-5a558dd8.js";import"./index-862e6100.js";import"./index-e3f1c84d.js";import"./index-456e198c.js";import"./FormTypeDate-76efc7f5.js";import"./FormTypeHtml-2e7f796d.js";import"./FormTypeNumber-630b6129.js";import"./FormTypePassword-2110b743.js";import"./FormTypeText-9fa44ea1.js";import"./FormTypeTextArea-9d9cfa8b.js";import"./index-1c0e67c4.js";import"./i18n-9fd04d21.js";const{useEffect:y}=__STORYBOOK_MODULE_ADDONS__,me={title:"Tables/Crud",component:f},_=[{accessorKey:"uuid",enableColumnFilter:!0,enableSorting:!0,dropdown:!0},{accessorKey:"ean"},{accessorKey:"name",header:"Edad"},{accessorKey:"description",header:"Desc.",enableColumnFilter:!0},{accessorKey:"price",enableColumnFilter:!0,fieldType:a.NUMBER},{accessorKey:"category_id",header:"Cat.",cell:e=>e.row.original.category,enableColumnFilter:!0,fieldType:a.SELECT,selectOptionsUrl:"/api/get_options",visible:!1},{header:"Date",accessorFn:e=>s.fromISO(e.created_at).toMillis(),enableColumnFilter:!0,enableSorting:!0,fieldType:a.DATE,cell:e=>s.fromISO(e.row.original.created_at).toISODate()+" => "+s.fromISO(e.row.original.created_at).toMillis()}],r={args:{columns:_,data:S,enableGlobalFilter:!0},render:e=>{const[g,h]=n.useState(""),l=n.useRef(!1);y(()=>(l.current=!0,()=>{l.current=!1}),[]);const b=i=>{var c,u;h(i.target.value);const F=[{id:"category_id",value:i.target.value}];(c=o.current)!=null&&c.table&&((u=o.current)==null||u.table.setColumnFilters(F))},C=t.jsx(t.Fragment,{children:t.jsx(T,{handleChange:b,controlId:"Test change",name:"Test change",selectOptionsUrl:"/api/get_options",value:g,label:"This is a external filter"})}),o=n.useRef(null);return t.jsx(f,{...e,customButtons:C,ref:o})}};var m,p,d;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(d=(p=r.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const pe=["WithFilters"];export{r as WithFilters,pe as __namedExportsOrder,me as default};
//# sourceMappingURL=WithFilters.stories-34007ad0.js.map
