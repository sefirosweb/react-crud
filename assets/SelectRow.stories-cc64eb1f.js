import{j as o}from"./ThemeProvider-a71a5aa9.js";import{r as l}from"./index-61bf1805.js";import{C as m}from"./index-09911b0c.js";import{d as f}from"./Product-485710e0.js";import{B as R}from"./Button-97fb7a83.js";import"./_commonjsHelpers-de833af9.js";import"./index-46c535a1.js";import"./LoadingSpinner-ee85fb67.js";import"./useTranslation-9aad8729.js";import"./i18nInstance-1f8a4d28.js";import"./matchStrings-5a558dd8.js";import"./i18n-28032080.js";import"./axios-94372f69.js";import"./index-11f483a8.js";import"./FormTypeSelect-a02290b5.js";import"./useGetQueryClient-cbcca069.js";import"./Form-6057eae6.js";import"./index-8d47fad6.js";import"./createWithBsPrefix-e4b19ea9.js";import"./Row-b5cb55df.js";import"./useEventCallback-2ca67dcc.js";import"./Button-aac535fb.js";import"./index-249823ed.js";import"./index.esm-1806526e.js";import"./index-19ed8ea2.js";import"./index-7e0e44f4.js";import"./index-086f44c1.js";import"./LoadingButton-5a00958f.js";import"./index-2801d3c9.js";import"./inheritsLoose-c82a83d4.js";import"./index-2675dd19.js";import"./FormTypeDate-ad6bce75.js";import"./FormTypeHtml-bc29b9bd.js";import"./FormTypeNumber-343302cd.js";import"./FormTypePassword-3ad9ea3e.js";import"./FormTypeText-37a0c392.js";import"./FormTypeTextArea-3b3f545c.js";import"./index-ae92ecc3.js";import"./index-5be08948.js";import"./index-3fa57039.js";import"./index-b8849b91.js";import"./index-1edb519e.js";const so={title:"Tables/Crud",component:m},C=[{accessorKey:"uuid",enableColumnFilter:!0},{accessorKey:"ean"},{accessorKey:"name"},{accessorKey:"description",header:"Desc."},{accessorKey:"price",header:"€"},{accessorKey:"category",header:"Cat."}],r={args:{columns:C,data:f,canSelectRow:!0},render:p=>{const t=l.useRef(null),a=()=>{var e;const u=(e=t.current)==null?void 0:e.getSelectedRows().map(d=>d.ean);console.log({eans:u})},i=o.jsx(o.Fragment,{children:o.jsx(R,{onClick:a,children:"Show selected row data"})});return o.jsx(m,{...p,customButtons:i,ref:t})}};var n,s,c;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
}`,...(c=(s=r.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};const co=["SelectRow"];export{r as SelectRow,co as __namedExportsOrder,so as default};
//# sourceMappingURL=SelectRow.stories-cc64eb1f.js.map
