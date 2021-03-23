package br.edu.utfpr.pb.projetotcc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig extends WebMvcConfigurationSupport{

	// http://localhost:8026/v2/api-docs
	
	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				// .apis(RequestHandlerSelectors.any()) 
				.apis( RequestHandlerSelectors.basePackage("br.edu.utfpr.pb.aula5"))
				// .paths(PathSelectors.ant("/genero/**"))
				.paths(PathSelectors.any())
				.build()
				.apiInfo(apiInfo());
	}
	
	private ApiInfo apiInfo() {
		return new ApiInfoBuilder()
					.title("PW26S - Aula 5")
					.description("Spring Boot REST API - Controle de Séries")
					.version("0.0.1")
					.license("Apache License Version 2.0")
					.licenseUrl("http://www.apache.org/licenses/LICENSE-2.0")
					.contact(new Contact("João das Neves", "www.jsnow.com", "joao@snow.com"))
					.build();
	}
	
	
	@Override
	protected void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("swagger-ui.html")
			.addResourceLocations("classpath:/META-INF/resources/");
		
		registry.addResourceHandler("/webjars/**")
		.addResourceLocations("classpath:/META-INF/resources/webjars/");
	}
}
