import{j as o}from"./ThemeProvider-a71a5aa9.js";import{r as l}from"./index-61bf1805.js";import{C as m}from"./index-973c3ed4.js";import{d as f}from"./Product-46e939d3.js";import{B as R}from"./Button-97fb7a83.js";import"./_commonjsHelpers-de833af9.js";import"./index-08f36b8f.js";import"./LoadingSpinner-ee85fb67.js";import"./useTranslation-9aad8729.js";import"./i18nInstance-1f8a4d28.js";import"./matchStrings-5a558dd8.js";import"./i18n-2050a10d.js";import"./axios-94372f69.js";import"./index-a64f52dd.js";import"./Form-6057eae6.js";import"./index-8d47fad6.js";import"./createWithBsPrefix-e4b19ea9.js";import"./FormTypeDate-ad6bce75.js";import"./FormTypeHtml-bc29b9bd.js";import"./FormTypeNumber-343302cd.js";import"./FormTypePassword-3ad9ea3e.js";import"./FormTypeSelect-a02290b5.js";import"./useGetQueryClient-cbcca069.js";import"./FormTypeText-37a0c392.js";import"./FormTypeTextArea-3b3f545c.js";import"./Row-b5cb55df.js";import"./useEventCallback-2ca67dcc.js";import"./Button-aac535fb.js";import"./index-249823ed.js";import"./index.esm-1806526e.js";import"./index-58e54fd9.js";import"./index-086f44c1.js";import"./LoadingButton-5a00958f.js";import"./index-2801d3c9.js";import"./inheritsLoose-c82a83d4.js";import"./index-e46df336.js";import"./index-8b309e46.js";import"./index-5be08948.js";import"./index-3fa57039.js";import"./index-76c9199d.js";import"./index-3c2a34dd.js";const no={title:"Tables/Crud",component:m},C=[{accessorKey:"uuid",enableColumnFilter:!0},{accessorKey:"ean"},{accessorKey:"name"},{accessorKey:"description",header:"Desc."},{accessorKey:"price",header:"€"},{accessorKey:"category",header:"Cat."}],r={args:{columns:C,data:f,canSelectRow:!0},render:a=>{const t=l.useRef(null),p=()=>{var e;const u=(e=t.current)==null?void 0:e.getSelectedRows().map(d=>d.ean);console.log({eans:u})},i=o.jsx(o.Fragment,{children:o.jsx(R,{onClick:p,children:"Show selected row data"})});return o.jsx(m,{...a,customButtons:i,ref:t})}};var n,s,c;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    columns: columns,
    data: data,
    canSelectRow: true
  },
  render: props => {
    const crudRef = useRef<PropsRef>(null);
    const handleClick = () => {
      const eans = crudRef.current?.getSelectedRows<Product>().map(o => o.ean);
      console.log({
        eans
      });
    };
    const customButtons = <>
        <Button onClick={handleClick}>Show selected row data</Button>
      </>;
    return <Crud {...props} customButtons={customButtons} ref={crudRef} />;
  }
}`,...(c=(s=r.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};const so=["SelectRow"];export{r as SelectRow,so as __namedExportsOrder,no as default};
//# sourceMappingURL=SelectRow.stories-80570d1b.js.map
