module.exports = function (grunt) {
    grunt.initConfig({
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'style.css': 'style.scss'
				}
			}
		}/* ,
        autoprefixer: {
            dist: {
                files: {
                    'assets/css/style.css': 'assets/css/style.css'
                }
            }
        } */
    });
	
	grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.loadNpmTasks('grunt-autoprefixer');
	
	grunt.registerTask('default', ['sass'/* , 'autoprefixer' */]);
};