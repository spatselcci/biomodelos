class AdministratorsMailer < ApplicationMailer

	def contact_us(message)
	    @message = message
	    @datetime = DateTime.now
	    mail to: "spatsel.cci@gmail.com",  subject: "BioModelos: Formulario de contacto"
  	end

	def model_uploaded(user, publication)
	    @user = user
	    @publication = publication
	    @datetime = DateTime.now
	    mail to: "spatsel.cci@gmail.com",  subject: "BioModelos: Nuevo modelo publicado por experto"
	end

	def group_suggested(user, new_group)
		@user = user
		@new_group = new_group
		@datetime = DateTime.now
		mail to: "spatsel.cci@gmail.com",  subject: "BioModelos: Nueva sugerencia de grupo"
	end
end
