package mx.edu.utez.diagnostico.cliente;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {
    @Id
    @GeneratedValue ( strategy = GenerationType.AUTO )
    private Long id;
    private String nombre;
    private String apellidos;
    @Column( unique = true )
    private String curp;
    private Date fechaNacimiento;
}
