var _speciesFunctionsModule = function(){
	/**
 	* Reset the filter controls (año, mes, select, filtros) to the
 	* default values.
	*/
	function resetRecordsFilters(){
		//Reset slider Año
		angular.element($("#visCntrl")).scope().resetSlider();
		//Reset meses
		$('input:checkbox.meschk').removeAttr('checked');
		//Reset filters
		$(".select-options li:contains('Tipo de filtro')").click();
		//Reset visualizar filters
		$('#chkBoxFilters input:checkbox').removeAttr('checked');
		//Activate the default checkbox
		$('#chkBoxFilters input:checkbox[name="visualadd"]').prop('checked', true);
	}
	return{
		resetRecordsFilters:resetRecordsFilters
	}
}();

$(document).ready(function(){
  jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

	/*
	* Advanced search filters
	*/

	function add_species_filters(){
		var bmclasses = [];
		var categories = [];
		$('.sppbtn input[type="checkbox"]').each(function () {
                    if (this.checked && this.value == 1)
                      bmclasses.push('mamiferos');
                    if (this.checked && this.value == 2)
                      bmclasses.push('aves');
                    if (this.checked && this.value == 3)
                      bmclasses.push('reptiles');
                    if (this.checked && this.value == 4)
                      bmclasses.push('anfibios');
                    if (this.checked && this.value == 5)
                      bmclasses.push('peces');
                    if (this.checked && this.value == 6)
                      bmclasses.push('invertebrados');
                    if (this.checked && this.value == 7)
                      bmclasses.push('plantas');
        });

		$('.typebtn input[type="checkbox"]').each(function () {
                    if (this.checked && this.value == 1)
                      categories.push('Endemic');
                    if (this.checked && this.value == 2)
                      categories.push('Invasive');
                    if (this.checked && this.value == 3)
                      categories.push('Endangered');
                  	if (this.checked && this.value == 4)
                      categories.push('Valid');
         });
		var bio_locale = $("#locale_field").val();
		$.post( "http://biomodelos.humboldt.org.co/" + bio_locale + "/species/filter", {bmclasses: bmclasses, categories: categories});
	}

	$(".cajasearch").on("click"," .sppbtn input[type='checkbox']", add_species_filters);
	$(".cajasearch").on("click"," .typebtn input[type='checkbox']", add_species_filters);

	/*
	* Botones de cerrar las cajas del menú: Búsqueda, Info, Modelos, Contribuciones
	*/
	$("#clsSearchBox").click(function(e){
		if ($(".vbtnfind").hasClass('vbtnact')){
      		$(".vbtnfind").removeClass('vbtnact');
   		}
	});
	$("#clsInfoBox").click(function(e){
		if ($(".vbtninfo").hasClass('vbtnact')){
      		$(".vbtninfo").removeClass('vbtnact');
   		}
	});
	$("#clsModelsBox").click(function(e){
		if ($(".vbtnhipo").hasClass('vbtnact')){
      		$(".vbtnhipo").removeClass('vbtnact');
   		}
	});
	$("#clsEditBox").click(function(e){
		if ($(".vbtnedit").hasClass('vbtnact')){
      		$(".vbtnedit").removeClass('vbtnact');
   		}
	});

	/*
	*	Funcionalidad de los botones de edición de polígonos y agregación de registros.
	*/
	function deactivateEdition(){
		if($(".polig").hasClass("polibtnact")){
			$(".polig").removeClass("polibtnact");
		}
		$(".polig").removeClass("opacitybtn");
		$(".polig").prop('disabled', false);
		$(".delpoli").removeClass("opacitybtn");
		$(".delpoli").prop('disabled', false);
		$(".editbotones").hide();
		$(".edipoli").removeClass("polibtnact");
	}
	function deactivateDeletion(){
		if($(".polig").hasClass("polibtnact")){
			$(".polig").removeClass("polibtnact");
		}
		$(".polig").removeClass("opacitybtn");
		$(".polig").prop('disabled', false);
		$(".edipoli").removeClass("opacitybtn");
		$(".edipoli").prop('disabled', false);
		$(".delbotones").hide();
		$(".delpoli").removeClass("polibtnact");
	}

	$("#edit_tools_box").on("click",".polig",function(e){
		if($(this).hasClass("polibtnact")){
			_BioModelosVisorModule.deactivateDraw();
			$(this).removeClass("polibtnact");
		}
		else{
			if($("#newModel_field").val() == 'true'){
				_BioModelosVisorModule.drawPolygon(true);
			}
			else{
				_BioModelosVisorModule.drawPolygon(false);
			}
			$(this).addClass("polibtnact");
		}
		e.preventDefault();
	});
	$("#edit_tools_box").on("click",".edipoli",function(e){
		_BioModelosVisorModule.deactivateDraw();
		_BioModelosVisorModule.editPolygon();
		$(".polig").addClass("opacitybtn");
		$(".polig").prop('disabled', true);
		$(".delpoli").addClass("opacitybtn");
		$(".delpoli").prop('disabled', true);
		if(!$(".editbotones").is(":visible")){
			$(".editbotones").show();
			$(this).addClass("polibtnact");
		}
		e.preventDefault();
	});
	$("#edit_tools_box").on("click",".delpoli",function(e){
		_BioModelosVisorModule.deactivateDraw();
		_BioModelosVisorModule.deletePolygon();
		$(".polig").addClass("opacitybtn");
		$(".polig").prop('disabled', true);
		$(".edipoli").addClass("opacitybtn");
		$(".edipoli").prop('disabled', true);
		if(!$(".delbotones").is(":visible")){
			$(".delbotones").show();
			$(this).addClass("polibtnact");
		}
		e.preventDefault();
	});

	function resetPolygonButtons(){
		// Botón para volver los botones de edición a su estado normal.
		deactivateEdition();
		deactivateDeletion();
	}

	$("#edit_tools_box").on("click",".saveedit",function(e){
		_BioModelosVisorModule.saveEditPolygon();
		deactivateEdition();
		e.preventDefault();
	});
	$("#edit_tools_box").on("click",".canceledit",function(e){
		_BioModelosVisorModule.cancelEditPolygon();
		deactivateEdition();
		e.preventDefault();
	});
	$("#edit_tools_box").on("click",".savedel",function(e){
		_BioModelosVisorModule.saveDeletePolygon();
		deactivateDeletion();
		e.preventDefault();
	});
	$("#edit_tools_box").on("click",".canceldel",function(e){
		_BioModelosVisorModule.cancelDeletePolygon();
		deactivateDeletion();
		e.preventDefault();
	});
	$("#add_records_box").on("click","#btnAddSingleRecord",function(e){
		_BioModelosVisorModule.deactivateDraw();
		_BioModelosVisorModule.drawSinglePoint();
		if(!$(this).hasClass("btngenact"))
			$(this).addClass("btngenact");
		e.preventDefault();
	});
	$("body").on("click", "#popUpCancelBtn", function(e){
  		e.preventDefault();
		_BioModelosVisorModule.cancelAddPoint();
		$("#btnAddSingleRecord").toggleClass("btngenact");
	});

	$("body").on("click", "#puNewPolygonCancelBtn", function(e){
  		e.preventDefault();
		_BioModelosVisorModule.cancelDrawnLayer();
		if($(this).hasClass("polibtnact"))
			$(this).removeClass("polibtnact");
	});

	$("#edit_tools_box").on("click","#btnPauseEdition",function(e){
		e.preventDefault();
		$.post("http://biomodelos.humboldt.org.co/users_layers/pause_layer", {
				id: $("#layer_id_field").val(),
		    	species_id: $("#species_id_field").val(),
		    	threshold: angular.element($("#visCntrl")).scope().corteSlider.value,
		    	geoJSON: _BioModelosVisorModule.getGeojsonLayer($("#newModel_field").val()),
		    	newModel: $("#newModel_field").val()
		});
	});

	$("#edit_tools_box").on("click","#btnEnvEdition",function(e){
		e.preventDefault();
		alertify.confirm('¿Desea enviar esta como su versión final?', function(e){
			if(e){
				$.ajax({
		    		type: 'POST',
		    		url: "http://biomodelos.humboldt.org.co/users_layers/send_layer",
		    		data: {
		    			id: $("#layer_id_field").val(),
		    			species_id: $("#species_id_field").val(),
		    			threshold: angular.element($("#visCntrl")).scope().corteSlider.value,
		    			geoJSON: _BioModelosVisorModule.getGeojsonLayer($("#newModel_field").val()),
		    			newModel: $("#newModel_field").val()
		    		},
		    		success: function(){
				    	/* TODO CANCELAR EDICION */
						alertify.alert("El registro ha sido agregado con éxito");
					},
					error: function(jqXHR, textStatus, errorThrown){
						alertify.alert("Ha ocurrido un error al enviar las ediciones: " + textStatus);
					}
				});
			}
		});
	});

	/*
	 * Funcionalidad para seleccionar los valores de los filtros de manera dinámica.
	 */
	$("#filtroRegistro").change(function(){
		 _CustomSelectModule.selectValues("#resultadoFiltro", _BioModelosVisorModule.uniqueValues($('#filtroRegistro option:selected').text()));
	});


	/**
 	* Records filter action
	* On click action that initializes arrays with the actual values of each type of filter
	* (Año, Mes, Buscar por, Visualizar) and passes them to a function.
	*/
	$("#filtrarBtn").click(function(e){
		var findByFilters = [],
			yearFilters = [],
			monthFilters = [],
			visualizeFilters = [],
			yearNotApplicableValue = 0,
			yearTodayValue = moment().format("YYYY");

		findByFilters[0] = $("#filtroRegistro option:selected").text();
		findByFilters[1] = $("#resultadoFiltro option:selected").text();

  		yearFilters[0] = $("#sliYearMin").val();
  		yearFilters[1] = $("#sliYearMax").val();

  		//Set default values to non-numeric options of the Year slider.
  		if(yearFilters[0] === 'Hoy')
  			yearFilters[0] = yearTodayValue;
  		else if (yearFilters[0] === 'NA')
  			yearFilters[0] = yearNotApplicableValue;
  		if(yearFilters[1] === 'Hoy')
  			yearFilters[1] = yearTodayValue;
  		else if (yearFilters[1] === 'NA')
  			yearFilters[1] = yearNotApplicableValue;

  		//Goes through every month checkbox and stores the attribute name of the checked ones.
  		$('input[type="checkbox"].meschk').each(function () {
  			if(this.checked)
  				monthFilters.push($(this).attr('name'));
  		});
  		/*Goes through every visualize checkbox and stores the attribute name of the checked ones.
  		* If the option is not checked, it stores an empty string */
  		$('input[type="checkbox"].checkregistros').each(function () {
  			if(this.checked)
  				visualizeFilters.push($(this).attr('name'));
  			else
  				visualizeFilters.push("");
  		});
  		$.post( "http://biomodelos.humboldt.org.co/records/edit_record", { species_id: $("#species_id_field").val()}).done(function(data) {
    		_BioModelosVisorModule.filterRecords(findByFilters, visualizeFilters, yearFilters, monthFilters, data);
  		});
	});

	/* Botón Limpiar filtros
	*
	*/
	$("#limpiarBtn").click(function(e){
		_speciesFunctionsModule.resetRecordsFilters();
		//Reset data
		$.post( "http://biomodelos.humboldt.org.co/records/edit_record", { species_id: $("#species_id_field").val()}).done(function(data) {
    		_BioModelosVisorModule.getSpeciesRecords($("#species_id_field").val(), data);
  		});
	});


	/**
 	* Shows the edition menu for editing an existing model or creating a new one.
 	*
	* @param {Boolean} event.data.IsNewMap - True if it's activating the create a new map edition
	* menu or False if it's the model edition menu.
	*/
	function _activateEditionMenu(event){
		//Cierra menú edición
		$("#clsEditBox").click();
		//Carga umbrales si es edición de mapa y carga capa pausada si existe
		if(event.data.isNewMap){
			//Oculta el slider de umbrales
			$("#regMenu_slider").hide();
		}
		else{
			_BioModelosVisorModule.loadThresholdLayer();
		}
		_BioModelosVisorModule.loadEditionLayer();
		$.ajax({
		    type: 'POST',
		    url: "http://biomodelos.humboldt.org.co/users_layers/load_layer",
		    data: {
		    	species_id: $("#species_id_field").val(),
		    	new_map: event.data.isNewMap
		    }
		});
		//Visibiliza y muestra el menú de edición
		resetPolygonButtons();
		if($(".cajaregistros").is(":visible")){
			$(".btnregistros").click();
		}
		$(".btnedicion").show();
		$(".btnedicion").click();
		//Set newModel value
		$("#newModel_field").val(event.data.isNewMap);
	}

	/* Edition Menu button */
	$("#visCntrl").on("click", "#cbt_editBtn", { isNewMap: false }, _activateEditionMenu);

	/* Create your map button */
	$("#visCntrl").on("click", "#cbt_crearBtn", { isNewMap: true }, _activateEditionMenu);

	$("#visCntrl").on("click",".vbtnedit", function(e){
		if ($(".cajasearch").is(":visible")) $("#clsSearchBox").click();
		if ($(".hipotesis").is(":visible")) $("#clsModelsBox").click();
		if ($(".infocaja").is(":visible")) $("#clsInfoBox").click();
		/* TODO clean layers */
		$("#regMenu_slider").show();
		$(".modelname").html("");
		if($(".modelname").hasClass("gradient"))
          $(".modelname").removeClass("gradient");
		$(".btnedicion").hide();
		if($(".cajitaeditar").is(":visible")){
			$(".btnedicion").click();
		}
		$.ajax({
		    type: 'POST',
		    url: "http://biomodelos.humboldt.org.co/" + $("#locale_field").val() + "/models/get_thresholds",
		    data: {
		    	species_id: $("#species_id_field").val(),
		    }
		});
	});

	$(".vbtnfind").click(function(e){
		if ($(".editbox").is(":visible")) $("#clsEditBox").click();
		if ($(".hipotesis").is(":visible")) $("#clsModelsBox").click();
		if ($(".infocaja").is(":visible")) $("#clsInfoBox").click();
		if ($(".vbtnfind").hasClass('vbtnact')) add_species_filters();
	});

	$(".vbtnhipo").click(function(e){
		if ($(".cajasearch").is(":visible")) $("#clsSearchBox").click();
		if ($(".editbox").is(":visible")) $("#clsEditBox").click();
		if ($(".infocaja").is(":visible")) $("#clsInfoBox").click();
		/* TODO clean layers */
		$(".modelname").html("");
		if($(".modelname").hasClass("gradient"))
          $(".modelname").removeClass("gradient");
		$(".btnedicion").hide();
		if($(".cajitaeditar").is(":visible")){
			$(".btnedicion").click();
		}
		$.ajax({
		    type: 'POST',
		    url: "http://biomodelos.humboldt.org.co/" + $("#locale_field").val() + "/models/get_hypotheses",
		    data: {
		    	species_id: $("#species_id_field").val(),
		    }
		});
	});

	$(".vbtninfo").click(function(e){
		if ($(".cajasearch").is(":visible")) $("#clsSearchBox").click();
		if ($(".editbox").is(":visible")) $("#clsEditBox").click();
		if ($(".hipotesis").is(":visible")) $("#clsModelsBox").click();
		/* TODO clean layers */
		$.ajax({
		    type: 'POST',
		    url: "http://biomodelos.humboldt.org.co/" + $("#locale_field").val() + "/species/species_info",
		    data: {
		    	species_id: $("#species_id_field").val(),
		    }
		});
	});

	function map_status_name(status){
		var mapped_status ="";
		switch (status) {
	  		case 'pendingValidation':
	    		mapped_status = 'Validación pendiente';
	    		break;
	  		case 'Valid':
	    		mapped_status = 'Validado';
	    		break;
	  		case 'Developing':
	    		mapped_status = 'En desarrollo';
	    		break;
	  		default:
	    		mapped_status = status;
	    		break;
		}
		return mapped_status;
	}

	$("#visCntrl").on("click",".sp_model_link",function(e){
        e.preventDefault();
        $("#clsModelsBox").click();
        $(".btnedicion").hide();
		if($(".cajitaeditar").is(":visible")){
			$(".btnedicion").click();
		}
		$(".modelname").html(map_status_name($("#txt_model_status").val()));
        _BioModelosVisorModule.unloadAllLayers();
		_BioModelosVisorModule.loadModel($(this).find('#imgsrc_model').val(), $('.titlethumb').val());

	});

	$("body").on("click","#editRecordBtn",function(e){
        e.preventDefault();
		_BioModelosVisorModule.editRecord();
  	});

  	function _refreshSpeciesRecords(){
  		$.post( "http://biomodelos.humboldt.org.co/records/edit_record", { species_id: $("#species_id_field").val()}).done(function(data) {
  			_BioModelosVisorModule.getSpeciesRecords($("#species_id_field").val(), data);
  		});
  	}

	/* Botón enviar edición de registro */
	$("body").on("click","#sendRecordEdition",function(e){
        e.preventDefault();
        validate.validators.presence.message = "no puede estar vacío";

		// Validación de los campos editables de un registro.
		var latRecordEdition = $("#txtLatEdit").val(),
			lonRecordEdition = $("#txtLonEdit").val(),
			speRecordEdition = $("#txtSpeciesEdit").val(),
			locRecordEdition = $("#txtLocEdit").val();

		var varsToValidate = {},
		constraints = {},
		data = {userId_bm: $("#user_id_field").val(),
				recordId: $("#bm_db_id").val()};

		if (latRecordEdition != $("#oldLatEdit").val()){
			varsToValidate.lat = latRecordEdition;
			constraints.lat = {};
			constraints.lat.numericality = {};
			constraints.lat.presence = true;
			constraints.lat.numericality.greaterThanOrEqualTo = -90;
			constraints.lat.numericality.lessThanOrEqualTo = 90;
			data.lat = latRecordEdition;
		}
		if (lonRecordEdition != $("#oldLonEdit").val()){
			varsToValidate.lon = lonRecordEdition;
			constraints.lon = {};
			constraints.lon.numericality = {};
			constraints.lon.presence = true;
			constraints.lon.numericality.greaterThanOrEqualTo = -180;
			constraints.lon.numericality.lessThanOrEqualTo = 180;
			data.lon = lonRecordEdition;
		}
		if(speRecordEdition != $("#oldSpeciesEdit").val()){
			varsToValidate.speciesOriginal = speRecordEdition;
			data.speciesOriginal = speRecordEdition;
		}
		if (locRecordEdition != $("#oldLocEdit").val()){
			varsToValidate.localidad = locRecordEdition;
			constraints.localidad = {};
			constraints.localidad.presence = true;
			data.locality = locRecordEdition;
		}
		var valResponse = validate(varsToValidate, constraints, {format: "flat"});
		if(valResponse){
			var response = "";
			for(var i=0; i<valResponse.length; i++){
				response += valResponse[i] + "<br />";
			}
			alertify.alert(response);
		}
		else{
			$.post( "http://biomodelos.humboldt.org.co/records/update_record", data)
  				.done(function() {
    				_refreshSpeciesRecords();
					alertify.alert("Su edición se ha realizado con éxito");
  				})
  				.fail(function(jqXHR, textStatus, errorThrown){
					alertify.alert("Ha ocurrido un error al editar el registro: " + textStatus);
				});
		}
	});

	/* Botón enviar nuevo registro */
	$("body").on("click","#r_saveBtn",function(e){
        e.preventDefault();
		validate.validators.presence.message = "no puede estar vacío";

		// Validación de los campos editables de un registro.
		var latNew = $("#txtNewRecordLat").val(),
			lonNew = $("#txtNewRecordLon").val(),
			altNew = $("#r_altitude").val(),
			yearNew = $("#year_registro").val(),
			monthNew = $("#month_registro").val(),
			dayNew = $("#day_registro").val(),
			depNew = $("#r_departamento").val(),
			munNew = $("#r_municipio").val(),
			locNew = $("#r_localidad").val(),
			tipoNew = $("#r_tipo").val(),
			obsNew = $("#r_observador").val(),
			citaNew = $("#r_cita").val(),
			catNumberNew = $("#r_ncatalog").val(),
			colNew = $("#r_coleccion").val(),
			instNew = $("#r_institucion").val(),
			commentNew = $("#r_comment").val();


		var varsToValidate = {},
		constraints = {},
		data = {taxID: $("#species_id_field").val(),
				acceptedNameUsage: $(".spname").html(),
				userId_bm: $("#user_id_field").val()};

		varsToValidate.lat = latNew;
		constraints.lat = {};
		constraints.lat.numericality = {};
		constraints.lat.presence = true;
		constraints.lat.numericality.greaterThanOrEqualTo = -90;
		constraints.lat.numericality.lessThanOrEqualTo = 90;
		data.lat = latNew;

		varsToValidate.lon = lonNew;
		constraints.lon = {};
		constraints.lon.numericality = {};
		constraints.lon.presence = true;
		constraints.lon.numericality.greaterThanOrEqualTo = -180;
		constraints.lon.numericality.lessThanOrEqualTo = 180;
		data.lon = lonNew;

		varsToValidate.localidad = locNew;
		constraints.localidad = {};
		constraints.localidad.presence = true;
		data.locality = locNew;

		if(altNew != ""){
			varsToValidate.altura = altNew;
			constraints.altura = {};
			constraints.altura.numericality = {};
			constraints.altura.numericality.greaterThanOrEqualTo = 0;
			constraints.altura.numericality.lessThanOrEqualTo = 10000;
			data["alt"] = altNew;
		}

		if(yearNew != ""){
			varsToValidate.yyyy = yearNew;
			constraints.yyyy = {};
			constraints.yyyy.numericality = {};
			constraints.yyyy.numericality.greaterThanOrEqualTo = 1800;
			constraints.yyyy.numericality.lessThanOrEqualTo = moment.utc().year();
			data.yyyy = yearNew;
		}
		if(monthNew != ""){
			varsToValidate.mm = monthNew;
			constraints.mm = {};
			constraints.mm.numericality = {};
			constraints.mm.numericality.greaterThanOrEqualTo = 1;
			constraints.mm.numericality.lessThanOrEqualTo = 12;
			data.mm = monthNew;
		}
		if(dayNew != ""){
			varsToValidate.dd = dayNew;
			constraints.dd = {};
			constraints.dd.numericality = {};
			constraints.dd.numericality.greaterThanOrEqualTo = 1;
			constraints.dd.numericality.lessThanOrEqualTo = 31;
			data.dd = dayNew;
		}
		if(depNew != "")
			data.adm1 = depNew;
		if(munNew != "")
			data.adm2 = munNew;
		if(tipoNew != "")
			data.basisOf = tipoNew;
		if(obsNew != "")
			data.collector = obsNew;
		if(citaNew != "")
			data.citation_bm = citaNew;
		if(catNumberNew != "")
			data.catalogNumber = catNumberNew;
		if(colNew != "")
			data.collection_code = colNew;
		if(instNew != "")
			data.institution = instNew;
		if(commentNew != "")
			data.comments_bm = commentNew;

		var valResponse = validate(varsToValidate, constraints, {format: "flat"});

		if(valResponse){
			var response = "";
			for(var i=0; i<valResponse.length; i++){
				response += valResponse[i] + "<br/>";
			}
			alertify.alert(response);
		}
		else{
			$.post( "http://biomodelos.humboldt.org.co/records/new_record", data)
  				.done(function() {
    				_BioModelosVisorModule.cancelAddPoint();
					_refreshSpeciesRecords();
					alertify.alert("El registro ha sido agregado con éxito");
  				})
  				.fail(function(jqXHR, textStatus, errorThrown){
					alertify.alert("Ha ocurrido un error al agregar el registro: " + errorThrown);
				});
		}
	});

	/* Save or updates ecological variables */
	$("body").on("change", "#eco_var_accordion input[type=checkbox]", function () {
	    var box_id = $(this).attr('name'),
	        eco_var_val = false;

	    if ($(this).prop("checked"))
	        eco_var_val = true;

      	$.ajax({
          type: "POST",
          url: "http://biomodelos.humboldt.org.co/eco_variables/add_ecological_variable",
          data: { species_id: $("#species_id_field").val(), eco_variable_id: box_id, selected: eco_var_val },
          error: function( jqXHR, textStatus, error ) {
            isError = true;
            alertify.alert( "Ha ocurrido un error al guardar la variable ecológica: " + error );
          }
    });
  });
});
