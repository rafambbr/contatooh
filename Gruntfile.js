module.exports = function (grunt) {

	grunt.initConfig({
		
		/*
		@ Parâmetros da task copy:
		
		• expand: quando true ativa o mapeamento dinâmico. No lugar de definirmos o nome de cada arquivo e 
		seu destino, indicamos o diretório de trabalho ( cwd), a origem ( src) e o destino ( desc).
		
		• cwd: diretório padrão (current work directory) no qual as demais propriedades se basearão. Em nosso 
		caso, queremos a própria pasta que contém nosso script Grunt, por isso utilizamos ‘.’.
		
		• src: array com os arquivos que devem ser copiados. Usamos o globbing pattern ‘**’ para copiar todos 
		os arquivos e diretórios. Desconsideramos alguns arquivos adicionando o prefixo ! em cada um deles.
		
		• dest: pasta de destino. Em nosso caso, a pasta dist, que é criada caso não exista.
		
		*/
		copy: {
			project: {
				expand: true,
				cwd: '.',
				src: ['**', '!Gruntfile.js', '!package.json', '!bower.json'],
				dest: 'dist'
			}
		},

		clean: {
			dist: {
				src: 'dist'
			}
		},

		usemin: {
			html: 'dist/app/views/**/*.ejs'
		},

		useminPrepare: {
			options: {
				root: 'dist/public',
				dest: 'dist/public'
			},
			html: 'dist/app/views/**/*.ejs'
		},

		ngAnnotate: {
			scripts: {
				expand: true,
				src: ['dist/public/js/**/*.js']
			}
		}

	});

	grunt.registerTask('default', ['dist', 'minifica']);

	grunt.registerTask('dist',
		['clean',
			'copy']);

	grunt.registerTask('minifica',
		['useminPrepare',
			'ngAnnotate',
			'concat',
			'uglify',
			'cssmin',
			'usemin']);

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-ng-annotate');
};