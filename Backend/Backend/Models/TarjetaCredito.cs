using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Backend.Models
{
    public partial class TarjetaCredito
    {
        public int Id { get; set; }
        [Required]
        public string Titular { get; set; }
        [Required]
        public string NroTarjeta { get; set; }
        [Required]
        public string FechaExpiracion { get; set; }
        [Required]
        public string Cvv { get; set; }
    }
}
