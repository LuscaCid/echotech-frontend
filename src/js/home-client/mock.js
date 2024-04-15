export default [
    {
        tipo_residuo: "Plástico",
        material: "PET",
        quantidade: 100,
        medida: "quilogramas",
        quantidade_ecocoins: 50,
        status: 1,
        data_solicitacao: "2024-04-15"
    },
    {
        tipo_residuo: "Papel",
        material: "Reciclável",
        quantidade: 200,
        medida: "quilogramas",
        quantidade_ecocoins: 80,
        status: 0,
        data_solicitacao: "2024-04-14"
    },
    {
        tipo_residuo: "Vidro",
        material: "Vidro comum",
        quantidade: 50,
        medida: "quilogramas",
        quantidade_ecocoins: 30,
        status: 1,
        data_solicitacao: "2024-04-13"
    }
    ,
    {
        tipo_residuo: "Vidro",
        material: "Vidro comum",
        quantidade: 50,
        medida: "quilogramas",
        quantidade_ecocoins: 30,
        status: -1,
        data_solicitacao: "2024-04-13"
    }
    ,
    {
        tipo_residuo: "papel",
        material: "caixa de papelao",
        quantidade: 50,
        medida: "quilogramas",
        quantidade_ecocoins: 30,
        status: 0,
        data_solicitacao: "2024-04-13"
    }
]

/**
 * id_solicitacao INT GENERATED ALWAYS AS IDENTITY,
	id_material INT,
	id_usuario INT,
	qt_material FLOAT,
	fl_status INT,
	dt_solicitacoes DATE,
 * 
 * 
 */